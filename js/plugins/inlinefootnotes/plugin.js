/**
 * @file
 * Plugin to insert inline footnotes.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

(function ($) {
  // Register the plugin within the editor.
  CKEDITOR.plugins.add('inlinefootnotes', {
    lang: 'en,nl,de',

    // Register the icons.
    icons: 'inlinefootnotes',

    // The plugin initialization logic goes inside this method.
    init: function (editor) {
      var lang = editor.lang.inlinefootnotes;

      // Define an editor command that opens our dialog.
      editor.addCommand('inlinefootnotes', new CKEDITOR.dialogCommand('inlinefootnotesDialog', {

        // Allow inlinefootnotes tag with optional title.
        allowedContent: 'fn[value]',

        // Require inlinefootnotes tag to be allowed to work.
        requiredContent: 'fn',

        // Transform footnotes into fns.
        contentForms: [
                'fn',
        ]
      }));

      // Create a toolbar button that executes the above command.
      editor.ui.addButton('inlinefootnotes', {

        // The text part of the button (if available) and tooltip.
        label: lang.buttonTitle,

        // The command to execute on click.
        command: 'inlinefootnotes',

        // The button placement in the toolbar (toolbar group name).
        toolbar: 'insert',

        // The path to the icon.
        icon: this.path + 'icons/footnotes.png'
      });

      var pluginDirectory = this.path;
      editor.addContentsCss( pluginDirectory + 'css/editor_inline_footnotes.css' );


      if (editor.contextMenu) {
        editor.addMenuGroup('inlinefootnotesGroup');
        editor.addMenuItem('inlinefootnotesItem', {
          label: lang.menuItemTitle,
          icon: this.path + 'icons/footnotes.png',
          command: 'inlinefootnotes',
          group: 'inlinefootnotesGroup'
        });

        editor.contextMenu.addListener(function (element) {
          if (element.getAscendant('fn', true)) {
            return { fn: CKEDITOR.TRISTATE_OFF };
          }
        });
      }

      // Register our dialog file. this.path is the plugin folder path.
      CKEDITOR.dialog.add('inlinefootnotesDialog', this.path + 'dialogs/inlinefootnotes.js');
    }
  });

})(jQuery);

