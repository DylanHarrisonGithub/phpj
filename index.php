<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script type="text/javascript" src="./phpj/engine/phpj.js"></script>
  <link rel="stylesheet" href="./components.style.css">
</head>
<body>
  <?php
    $phpj = require(__DIR__.'/phpj/phpj.php');
    echo $phpj['components']['phpjdemo']([], $phpj);
  ?>
</body>
</html>