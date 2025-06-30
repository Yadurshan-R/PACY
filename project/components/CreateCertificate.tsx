'use client';

import { useEffect, useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import * as fabric from 'fabric';

type TemplateElement = {
  id?: string;
  type: string;
  content: string;
  left: number;
  top: number;
  fontSize: number;
  fill: string;
  editable?: boolean;
  selectable?: boolean;
};

export default function CreateCertificate() {
  const [degrees, setDegrees] = useState<string[]>([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [template, setTemplate] = useState<string | null>(null);
  const [elements, setElements] = useState<TemplateElement[]>([]);
  const [isDegreeSet, setIsDegreeSet] = useState(false);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    fetch('/api/template')
      .then((res) => res.json())
      .then((data) => {
        const names = data.map((t: any) => t.degree);
        setDegrees(names);
      });
  }, []);

  const loadTemplate = async (degree: string) => {
    const res = await fetch(`/api/template/${encodeURIComponent(degree)}`);
    if (!res.ok) {
      alert('Template not found');
      return;
    }
    const data = await res.json();
    setTemplate(data.backgroundImage || null);
    setElements(data.elements || []);
    setIsDegreeSet(true);
  };

  useEffect(() => {
    if (!template || !editor?.canvas) return;

    const canvas = editor.canvas;
    const canvasWidth = 800;
    const canvasHeight = 600;

    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);
    canvas.clear();

    const imgElement = new Image();
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
      canvas.add(imgInstance);
      imgInstance.sendToBack?.();
      canvas.renderAll();

      // Add elements after background
      elements.forEach((el) => {
        const text = new fabric.IText(el.content || 'Text', {
          left: el.left,
          top: el.top,
          fontSize: el.fontSize,
          fill: el.fill,
          editable: true,
          selectable: true,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
          hoverCursor: 'default',
        });
        canvas.add(text);
      });

      canvas.renderAll();
    };

    imgElement.src = template;
  }, [template, editor, elements]);

  // STEP 0: Degree selector
  if (!isDegreeSet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Choose Degree Template</h2>
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Degree --</option>
            {degrees.map((deg) => (
              <option key={deg} value={deg}>
                {deg}
              </option>
            ))}
          </select>
          <button
            onClick={() => selectedDegree && loadTemplate(selectedDegree)}
            disabled={!selectedDegree}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            Load Template
          </button>
        </div>
      </div>
    );
  }

  // STEP 4: Canvas preview screen
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white rounded-xl shadow p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-md font-semibold text-gray-700 mb-2">Viewing Template</h2>
          <p className="text-sm text-blue-600 font-medium">{selectedDegree}</p>
        </div>

        <button
          onClick={() => {
            setIsDegreeSet(false);
            setSelectedDegree('');
            setTemplate(null);
            setElements([]);
          }}
          className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          🔄 Change Degree
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Preview: {selectedDegree}</h2>
        </div>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <FabricJSCanvas className="canvas" onReady={onReady} />
        </div>
      </div>
    </div>
  );
}
