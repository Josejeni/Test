import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const Ckeditor = () => {
  return (
    <div className="editor-container">
      <h2>CKEditor 5 with Pagination</h2>
      <CKEditor
        editor={DecoupledEditor}
        data="<p>Start writing your document here...</p>"
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);

          // Insert the toolbar to your desired position
          const toolbarContainer = document.querySelector('.document-editor__toolbar');
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        }}
        config={{
          // Add pagination settings if needed
          // plugins: ['Pagination'],
          pagination: {
            pageSize: 800, // Number of characters per page
          },
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'undo', 'redo', '|',
            'pageBreak'  // Include the Page Break tool for manual pagination
          ]
        }}
      />
      <div className="document-editor__toolbar"></div>
    </div>
  );
};

export default Ckeditor;
