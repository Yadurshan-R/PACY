'use client';

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import * as fabric from 'fabric';
import { jsPDF } from 'jspdf';
import { Download, UploadCloud, Type } from 'lucide-react';

export default function TemplateDesigner() {
  const [template, setTemplate] = useState<string | null>(null);
  const [degreeName, setDegreeName] = useState('');
  const [isDegreeSet, setIsDegreeSet] = useState(false);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    if (!template || !editor?.canvas) return;

    const canvasWidth = 800;
    const canvasHeight = 600;

    editor.canvas.setWidth(canvasWidth);
    editor.canvas.setHeight(canvasHeight);
    editor.canvas.clear();

    const imgElement = new window.Image();
    imgElement.onload = () => {
      const imgInstance = new fabric.Image(imgElement, {
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
        hoverCursor: 'default',
      });

      imgInstance.scaleToWidth(canvasWidth);
      imgInstance.scaleToHeight(canvasHeight);
      editor.canvas.add(imgInstance);
      (imgInstance as any).sendToBack();
      editor.canvas.renderAll();
    };

    imgElement.src = template;
  }, [template, editor]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setTemplate(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addTextField = (text = 'Edit me') => {
    if (!editor) return;
    const iText = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#000',
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderColor: 'gray',
      cornerColor: 'blue',
      cornerSize: 6,
      padding: 5,
      editable: true,
    });
    editor.canvas.add(iText);
    editor.canvas.setActiveObject(iText);
    editor.canvas.renderAll();
  };

  const downloadCanvasAsPDF = () => {
    if (!editor || !editor.canvas) return;
    const dataURL = editor.canvas.toDataURL({ format: 'png', quality: 1 });
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [800, 600] });
    pdf.addImage(dataURL, 'PNG', 0, 0, 800, 600);
    pdf.save(`${degreeName.replace(/\s+/g, '_')}_template.pdf`);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (!isDegreeSet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Create Degree Template</h2>
          <input
            type="text"
            placeholder="Enter Degree Name (e.g., Bachelor of Design)"
            value={degreeName}
            onChange={(e) => setDegreeName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              if (degreeName.trim()) setIsDegreeSet(true);
            }}
            disabled={!degreeName.trim()}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Start Designing
          </button>
        </div>
      </div>
    );
  }

  const saveTemplateToServer = async () => {
    if (!editor?.canvas) return;

  const canvasObjects = editor.canvas.getObjects();

  const elements = canvasObjects.map((obj: { id: any; type: any; text: any; left: any; top: any; fontSize: any; fill: any; }) => {
    return {
      id: obj.id || crypto.randomUUID(),
      type: obj.type,
      content: obj.text || '',
      left: obj.left,
      top: obj.top,
      fontSize: obj.fontSize,
      fill: obj.fill,
      editable: true,
      selectable: false, // lock later for student edit
    };
  });

  const backgroundImage = template; // use uploaded image

  await fetch('/api/template', {
    method: 'POST',
    body: JSON.stringify({
      degreeName,
      elements,
      backgroundImage,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};


  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white rounded-xl shadow p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-md font-semibold text-gray-700 mb-2">Degree Template</h2>
          <p className="text-sm text-blue-600 font-medium">{degreeName}</p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-md font-semibold text-gray-700">Add Elements</h3>
          <button
            onClick={() => addTextField('Certificate Title')}
            className="flex items-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Type className="w-4 h-4 mr-2" /> Title
          </button>
          <button
            onClick={() => addTextField('Recipient Name')}
            className="flex items-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Type className="w-4 h-4 mr-2" /> Name
          </button>
          <button
            onClick={() => addTextField('Text Field')}
            className="flex items-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Type className="w-4 h-4 mr-2" /> Text Field
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Template Background</h3>
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 text-center transition"
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-6 h-6 text-gray-600 mb-1" />
            <p className="text-sm text-gray-600">Drop or select image</p>
          </div>
        </div>

        <button
          onClick={downloadCanvasAsPDF}
          className="flex items-center justify-center w-full px-4 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </button>
        <button
            onClick={() => {
                if (editor?.canvas) {
                const activeObject = editor.canvas.getActiveObject();
                if (activeObject) {
                    editor.canvas.remove(activeObject);
                    editor.canvas.renderAll();
                }
                }
            }}
            className="flex items-center w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
            <span className="w-4 h-4 mr-2">🗑️</span> Delete Selected
        </button>
        <button
  onClick={saveTemplateToServer}
  className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
>
  Save Template to DB
</button>

      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Designing: {degreeName}</h2>
          <button
            onClick={() => {
              setIsDegreeSet(false);
              setTemplate(null);
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Change Degree
          </button>
        </div>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <FabricJSCanvas className="canvas" onReady={onReady} />
        </div>
      </div>
    </div>
  );
}
