<?php

/**
 * @file
 * This file contains all theme and preprocess functions.
 */

/**
 * Implements hook_preprocess().
 */
function islandora_mirador_preprocess_islandora_mirador_viewer(array &$variables) {
  $mirador_lib = libraries_load(ISLANDORA_MIRADOR_LIB);
  $variables['mirador'] = array(
    array(
      '#type' => 'container',
    ),
    'iframe' => array(
      '#theme' => 'html_tag',
      '#tag' => 'iframe',
      '#value' => '',
      '#attributes' => array(
        'src' => array("/{$mirador_lib['library path']}/index.html"),
        'width' => '100%',
        'height' => '700px',
        'frameborder' => '0',
      ),
    ),
  );
}

/**
 * Renders the CWRC-Writer as an iframe.
 */
function theme_islandora_mirador_viewer(array $variables) {
  return drupal_render($variables['mirador']);
}
