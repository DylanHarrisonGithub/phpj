<?php

  return function($layout, $phpj) {
    $html = "";
    foreach($layout as $value) {
      // validation
      $err = $phpj['services']['validation'](
        $value['params'],
        $phpj['components'][$value['component']]['schema']
      );
      if (count($err) > 0) {
        $html .= '<p>Component schema error: '.print_r($err).'</p>';
      } else {
        $html .= $phpj['components'][$value['component']]['template']($value['params'], $phpj);
      }
    }
    return $html;
  }
  
?>