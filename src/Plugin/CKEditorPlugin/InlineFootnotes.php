<?php

namespace Drupal\inline_footnotes\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "inline_footnotes" plugin.
 *
 * @CKEditorPlugin(
 *   id = "inlinefootnotes",
 *   label = @Translation("Inline Footnotes"),
 *   module = "inline_footnotes"
 * )
 */
class InlineFootnotes extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'inline_footnotes') . '/js/plugins/inlinefootnotes/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [
      'inlinefootnotes' => [
        'label' => $this->t('Inline Footnotes'),
        'image' => drupal_get_path('module', 'inline_footnotes') . '/js/plugins/inlinefootnotes/icons/footnotes.png',
      ],
    ];
  }

}
