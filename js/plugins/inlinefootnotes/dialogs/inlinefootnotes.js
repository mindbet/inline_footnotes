/**
 * @file
 * The inline footnote dialog definition.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Our dialog definition.
CKEDITOR.dialog.add('inlinefootnotesDialog', function (editor) {
  var lang = editor.lang.inlinefootnotes;

  return {

    // Basic properties of the dialog window: title, minimum size.
    title: lang.dialogTitle,
    minWidth: 400,
    minHeight: 200,

    // Dialog window contents definition.
    contents: [
    {
      // Definition of the Basic Settings dialog tab (page).
      id: 'tab-basic',
      label: 'Basic Settings',

      // The tab contents.
      elements: [
      {
        // Text input field for the footnote (explanation).
        type: 'text',
        id: 'footnotelabel',
        label: lang.dialogFootnoteLabel,

        // Validation checking whether the field is not empty.
        validate: CKEDITOR.dialog.validate.notEmpty("Footnote field cannot be empty"),

        // Called by the main setupContent call on dialog initialization.
        setup: function (element) {
          this.setValue(element.getText());
        },

        // Called by the main commitContent call on dialog confirmation.
        commit: function (element) {
          headerspan = editor.document.createElement('span');
          headerspan.setAttribute('class', 'fn-header');
          labeltag = editor.document.createElement('span');
          labeltag.setAttribute('class', 'fn-label');
          labeltag.setText(this.getValue());
          headerspan.append(labeltag);

          closebutton = '<span class="fn-close">Hide</span';
          headerspan.appendHtml(closebutton);
          element.append(headerspan);

        },

        onShow: function () {
          var selection = editor.getSelection();
          if (!selection || selection.getStartElement().getAscendant('inlinefootnotes', true)) {
            return;
          }

          this.setValue(editor.getSelection().getSelectedText());
        }
      },

      {
        // Text input field for the inline footnote label.
        type: 'textarea',
        id: 'explanation',
        label: lang.dialogExplanation,

        // Require value attribute to be enabled.
        // requiredContent: 'inlinefootnotes[value]',

        // Called by the main setupContent call on dialog initialization.
        setup: function (element) {
          this.setValue(element.getAttribute("value"));
        },

        // Called by the main commitContent call on dialog confirmation.
        commit: function (element) {
          span = editor.document.createElement('span');
          element.append(span);
          span.setAttribute('class', 'fn-notes');
          span.setText(this.getValue());
        }
      }
      ]
    },

    ],

    // Invoked when the dialog is loaded.
    onShow: function () {

      // Get the selection in the editor.
      var selection = editor.getSelection();

      // Get the element at the start of the selection.
      var element = selection.getStartElement();

      // Get the <span> element closest to the selection, if any.
      if (element) {
        element = element.getAscendant('span', true);
      }

      // Create a new <span> element if it does not exist.
      if (!element || element.getName() != 'span') {
        element = editor.document.createElement('span');

        // Flag the insertion mode for later use.
        this.insertMode = true;
      }
      else {
        this.insertMode = false;
      }

      element.setAttribute('class', 'fn-content');

      // Store the reference to the <span> element in an internal property, for later use.
      this.element = element;

      // Invoke the setup methods of all dialog elements, so they can load the element attributes.
      if (!this.insertMode) {
        this.setupContent(this.element);
      }
    },

    // This method is invoked once a user clicks the OK button, confirming the dialog.
    onOk: function () {

      // The context of this function is the dialog object itself.
      // http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
      var dialog = this;

      // Creates a new <inlinefootnote> element.
      var inlinefootnote = this.element;

      // Invoke the commit methods of all dialog elements, so the <inlinefootnotes> element gets modified.
      this.commitContent(inlinefootnote);

      // Finally, in if insert mode, inserts the element at the editor caret position.
      if (this.insertMode) {
        editor.insertElement(inlinefootnote);
      }
    }
  };
});
