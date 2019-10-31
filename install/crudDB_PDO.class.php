<?php
class CrudDB_PDO {
  private $connection; 
  private $host = "";
  private $username = "";
  private $password = "";
  private $dbname = "";
  public $connection_error;
  public function __construct($host, $username, $password, $dbname) {
    $this->host = $host;     
    $this->username = $username;     
    $this->password = $password;     
    $this->dbname = $dbname;
    try { 
      $this->connection = new PDO("mysql:host=$this->host;dbname=$this->dbname",$this->username,$this->password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
      $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $err) {
      $this->connection_error = $err->getMessage();
    }
  }
  public function close() { $this->connection = null; }
  public function crud($action, $table, $params) {
    if ($action == 'create') {
      return $this->create($table, $params);
    } elseif ($action == 'read') {
      return $this->read($table, $params);
    } elseif ($action == 'update') {
      // getting error?
      $id = $params['id'];
      unset($params['id']);
      return $this->update($table, $id, $params);
    } elseif ($action == 'delete') {
      
      return $this->delete($table, $params['id']);
    } else {
      return [
        'success' => false,
        'message' => 'Requested action is not recognized.'
      ];
    }
  }
  public function create($table, $assoc_data) {
    
    $keys = array_keys($assoc_data);
    $query = "INSERT INTO $table (".implode(", ", $keys).") VALUES (:".implode(", :", $keys).")";
    try {
      $stmt = $this->connection->prepare($query)->execute($assoc_data);
    }
    catch (PDOException $err) {
      return [
        'success' => false,
        'message' => $err->getMessage()
      ];
    }
    return [
      'success' => true,
      'message' => 'Row successfully created.',
      'result' => $this->connection->lastInsertId()
    ];
  }
  public function read($table, $assoc_data) {
    $keys = array_keys($assoc_data);
    $query = "SELECT * FROM $table";
    if (count($keys) > 0) {
      $query .= " WHERE ";
      for ($i = 0; $i < count($keys); $i++) {
        $query .= $keys[$i]."=:$keys[$i]";
        if ($i < count($keys)-1) {
          $query .= " AND ";
        }
      }
    }
    try {
      $stmt = $this->connection->prepare($query);
      $stmt->execute($assoc_data);
    }
    catch (PDOException $err) {
      return [
        'success' => false,
        'message' => $err->getMessage()
      ];
    }
    $result = $stmt->fetchAll(PDO::FETCH_OBJ);
    $resultArray = [];
    foreach($result as $r) { array_push($resultArray, (array) $r); }
    return [
      'success' => true,
      'message' => 'Rows successfully retrieved.',
      'result' => $resultArray
    ];
  }
  public function update($table, $id, $assoc_data) {
    if (count($assoc_data) > 0) {
      $keys = array_keys($assoc_data);
      $query = "UPDATE $table SET ";
      for ($i = 0; $i < count($keys); $i++) {
        $query .= $keys[$i]."=:$keys[$i]";
        if ($i < count($keys)-1) {
          $query .= ", ";
        }
      }
      $query .= " WHERE id=$id";
      try {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($assoc_data);
      }
      catch (PDOException $err) {
        return [
          'success' => false,
          'message' => $err->getMessage(),
          'query' => $query
        ];
      }
  
      return [
        'success' => true,
        'message' => 'Row successfully updated.'
      ];
    } else {
      return [
        'success' => false,
        'message' => 'No updates were provided.'
      ];      
    }
  }
  public function delete($table, $id) {
    $query = "DELETE FROM $table WHERE id=$id";
    try {
      $stmt = $this->connection->prepare($query);
      $stmt->execute();
    }
    catch (PDOException $err) {
      return [
        'success' => false,
        'message' => $err->getMessage()
      ];
    }
    return [
      'success' => true,
      'message' => 'Row successfully deleted.'
    ];    
  }
}
?>