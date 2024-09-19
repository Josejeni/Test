import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

const MyCKEditor = () => {
  const [content, setContent] = useState('');
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateName, setTemplateName] = useState('');
  const editorRef = useRef(null);
  const [pageSize, setPageSize] = useState({
    pageSize: 'a5',
    width: '793.7px',
    height: '558.72px',
  });

  const handlePageSize = (e) => {
    let width, height;

    switch (e.target.value) {
      case 'a4':
        width = '793.7px';
        height = '1122.5px';
        break;
      case 'a5':
        width = '793.7px';
        height = '558.72px';
        break;
      case 'a3':
        width = '1190.55px';
        height = '1683.78px';
        break;
      default:
        width = '793.7px';
        height = '558.72px';
        break;
    }

    setPageSize({
      pageSize: e.target.value,
      width,
      height,
    });
  };

  const [templateList, setTemplateList] = useState([
    {
      name: 'Basic Template',
      html: '<p>This is a basic template with @student name@</p>'
    },
    {
      name: 'Hero Section',
      html: `
        <div style="text-align: center; padding: 20px; background: #f5f5f5;">
          <h1>Welcome to My Website</h1>
          <p>Your journey starts here. Explore our features and learn more about us.</p>
          <a href="#" style="font-size: 18px; color: #007bff;">Learn More</a>
        </div>
      `
    },
    {
      name: 'Contact Form',
      html: `
        <form action="#" method="post">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">Send</button>
        </form>
      `
    }
  ]);

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const insertTemplate = () => {
    const template = templateList.find(t => t.name === selectedTemplate);
    if (template) {
      setContent(template.html);
    }
  };

  const saveCurrentContentAsTemplate = () => {
    localStorage.setItem('content', content);
    localStorage.setItem('height', pageSize.height);
    localStorage.setItem('width', pageSize.width);

    if (templateName) {
      const newTemplate = {
        name: templateName,
        html: content,
      };
      setTemplateList([...templateList, newTemplate]);
      setTemplateName('');
      setContent('');
    }
  };

  const exportToPDF = () => {
    if (editorRef.current) {
      const editorElement = editorRef.current.querySelector('.ck-content');

      if (editorElement) {
        html2pdf().from(editorElement).set({
          margin: 1,
          filename: 'exported-content.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { orientation: 'portrait', unit: 'pt', format: 'A4' },
        }).save();
      }
    }
  };

  useEffect(() => {
    const updatedHtml = templateList[0].html.replace('@student name@', 'Josephin');
    setContent(updatedHtml);
  }, [templateList]);

  return (
    <div className="container mt-3 mb-5">
      <div className="row mb-2">
        <div className="col-2">
          <label>
            <select value={pageSize.pageSize} className="form-select" onChange={handlePageSize}>
              <option value="a4">A4</option>
              <option value="a5">A5</option>
            </select>
          </label>
        </div>
        <div className="col-4 d-flex">
          <select value={selectedTemplate} className="form-select" onChange={handleTemplateChange}>
            <option value="">Select a template</option>
            {templateList.map(template => (
              <option key={template.name} value={template.name}>{template.name}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={insertTemplate}>Load</button>
        </div>
        <div className="col-3 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={saveCurrentContentAsTemplate}>Save</button>
          <button className="btn btn-primary" onClick={exportToPDF}>Export</button>
        </div>
      </div>

      <div
        ref={editorRef}
        style={{
          width: pageSize.width,
          height: pageSize.height,
          border: '1px solid #ccc',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            toolbar: [
              'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
              '|', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells',
              '|', 'undo', 'redo', 'imageUpload', 'mediaEmbed', 'fontSize', 'fontColor', 'alignment'
            ],
            mention: {
              feeds: [
                {
                  marker: '@',
                  feed: [
                    '@JohnDoe',
                    '@JaneSmith',
                    '@Josephin',
                    '@StudentName',
                  ],
                  minimumCharacters: 1
                }
              ]
            },
            height: pageSize.height
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>
    </div>
  );
};

export default MyCKEditor;
