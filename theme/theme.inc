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
      '#tag' => 'div',
      '#attributes' => array(
        'id' => 'viewer'
      ),
    ),
  );
}

/**
 * Renders the CWRC-Writer as an iframe.
 */
function theme_islandora_mirador_viewer(array $variables) {
  $module_path = drupal_get_path('module', 'islandora_mirador');
  drupal_add_js("$module_path/js/islandora_mirador.js");
  drupal_add_js(array('Miradora' => $variables['settings']), array('type' => 'setting'));
  return drupal_render($variables['mirador']);
}

/**
 * Implements template_process_islandora_cwrc_writer_iframe().
 */
function template_process_islandora_mirador_viewer_iframe(array &$variables) {
  module_load_include('inc', 'islandora_mirador', 'includes/utilities');
  $variables['mirador'] = theme('islandora_mirador_viewer', array(
                            'settings' => $variables['settings'],
                          ));
  $variables['styles'] = drupal_get_css(islandora_mirador_embedded_css(), TRUE);
  $variables['scripts'] = drupal_get_js('header', islandora_mirador_embedded_js());
}

/**
 * Renders Mirador as an iframe.
 */
function theme_islandora_mirador_viewer_embedded(array $variables) {
  $src = $variables['src'];
  $width = $variables['width'];
  $height = $variables['height'];
  return "<iframe src='$src' width='$width' height='$height' style='border: none;'></iframe>";
}
