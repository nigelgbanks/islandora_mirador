<?php

/**
 * @file
 * Miscellaneous helper functions.
 */

/**
 * Fetches the paths for all the drupal required javascript files.
 *
 * @return array
 *   An array of paths to each of the system required javascript files, relative
 *   to DRUPAL_ROOT.
 */
function _islandora_mirador_drupal_required_js_files() {
  // By default in drupal_add_js() defined in DRUPAL_ROOT/includes/common.inc
  // settings, drupal.js, jquery.js, and jquery.once.js is included. We get the
  // library definitions for each of the jQuery libraries as a module might
  // overwrite those files, so we can't assume an location.
  $lib_jquery = drupal_get_library('system', 'jquery');
  // jQuery Update has the file path in a different location then the default.
  if (module_exists('jquery_update')) {
    $info = reset($lib_jquery['js']);
    $jquery = array($info['data']);
  }
  // Devel and Drupal both use the array key value to store the file location.
  else {
    $jquery = array_keys($lib_jquery['js']);
  }
  $lib_jquery_once = drupal_get_library('system', 'jquery.once');
  return array_merge(array('settings', 'misc/drupal.js'), $jquery, array_keys($lib_jquery_once['js']));
}

/**
 * Gets the javascript files, settings, etc, for Mirador when embedded.
 *
 * @return array
 *   The current array of JavaScript files, settings, and in-line code,
 *   including Drupal defaults, anything previously added with calls to
 *   drupal_add_js() that had 'cwrc_writer' => TRUE as an option.
 */
function islandora_mirador_embedded_js() {
  // Just experimenting here, we can't rely on a method of adding only that
  // which we need as what we need may be shared by other drupal processes, and
  // could have been added earlier so this algorithm will miss those cases.
  $js = drupal_add_js();
  $required_drupal_js_files = _islandora_mirador_drupal_required_js_files();
  $required_drupal_js_files = array_fill_keys($required_drupal_js_files, TRUE);
  $drupal_js = array_intersect_key($js, $required_drupal_js_files);
  $allowed_files = array(
    'mirador.js',
    'islandora_mirador.js',
  );
  foreach($js as $filename => $data) {
    $basename = basename($filename);
    if (!in_array($basename, $allowed_files)) {
      unset($js[$filename]);
    }
  }
  return $js;//$drupal_js + $js;
}

/**
 * Gets the javascript files, settings, etc, for Mirador when embedded.
 *
 * @return array
 *   The current array of JavaScript files, settings, and in-line code,
 *   including Drupal defaults, anything previously added with calls to
 *   drupal_add_js() that had 'cwrc_writer' => TRUE as an option.
 */
function islandora_mirador_embedded_css() {
  $allowed_files = array(
    'mirador-combined.min.css',
  );
  $css = drupal_add_css();
  foreach($js as $filename => $data) {
    $basename = basename($filename);
    if (!in_array($basename, $allowed_files)) {
      unset($css[$filename]);
    }
  }
  return $css;
}
