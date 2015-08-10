<?php

/**
 * @file
 * Menu Callbacks.
 */

/**
 * Menu callback that renders the CWRC-Writer for Demo Purposes.
 */
function islandora_mirador_demo_menu_item() {
  $unframed = array(
    'link' => array(
      '#theme' => 'link',
      '#text' => t('View in iFrame?'),
      '#path' => 'mirador',
      '#options' => array(
        'attributes' => array(),
        'html' => TRUE,
      ),
    ),
    'mirador' => array(
      '#theme' => 'islandora_mirador_viewer',
    ),
  );
  $framed = array(
    'link' => array(
      '#theme' => 'link',
      '#text' => t('View unframed?'),
      '#path' => 'mirador',
      '#options' => array(
        'attributes' => array(),
        'html' => TRUE,
        'query' => array('framed' => 'false'),
      ),
    ),
    'cwrc' => array(
      '#theme' => 'islandora_mirador_viewer_embedded',
    ),
  );
  $show_unframed = isset($_GET['framed']) && $_GET['framed'] === 'false';
  return array(
    'description' => array(
      '#prefix' => '<p>',
      '#suffix' => '</p>',
      '#markup' => t('DEMO...'),
    ),
    'editor' => $show_unframed ? $unframed : $framed,
  );
}

/**
 * Renders the Mirador Viewer.
 */
function islandora_mirador_iframe_callback() {
  return array(
    '#type' => 'page',
    '#theme_wrappers' => array('islandora_mirador_viewer_iframe'),
    'content' => array(
      '#theme' => 'islandora_mirador_viewer',
    ),
  );
}
