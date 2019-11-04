<?php

  return function($layout, $components) {
    $html = "";
    foreach($layout as $value) {
      $html .= $components[$value['component']]($value['params'], $components);
    }
    return $html;
  }
  
?>