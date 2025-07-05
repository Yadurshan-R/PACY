'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import * as fabric from 'fabric';
import { Download, ArrowLeft, RotateCcw, Eye, Palette, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import { useDropzone } from 'react-dropzone';

interface MousePosition {
  x: number;
  y: number;
}

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

interface CreateCertificateProps {
  onBack: () => void;
}

export default function CreateCertificate({ onBack }: CreateCertificateProps) {
  const [degrees, setDegrees] = useState<string[]>([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [template, setTemplate] = useState<string | null>(null);
  const [elements, setElements] = useState<TemplateElement[]>([]);
  const [isDegreeSet, setIsDegreeSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    degree: '',
    dateIssued: new Date().toISOString().split('T')[0]
  });
  const [activeTextObject, setActiveTextObject] = useState<fabric.IText | null>(null);
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Glass effect states
  const [selectorMousePosition, setSelectorMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isSelectorHovering, setIsSelectorHovering] = useState(false);
  const [loadButtonMousePosition, setLoadButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoadButtonHovering, setIsLoadButtonHovering] = useState(false);
  const [canvasMousePosition, setCanvasMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCanvasHovering, setIsCanvasHovering] = useState(false);

  // Refs
  const selectorRef = useRef<HTMLDivElement>(null);
  const loadButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { editor, onReady } = useFabricJSEditor();

  const MAX_DISPLAY_WIDTH = 800;
  const MAX_DISPLAY_HEIGHT = 600;

  const handleMouseMove = useCallback(
    (e: MouseEvent, setter: (pos: MousePosition) => void, ref: React.RefObject<HTMLElement>) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setter({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [],
  );

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowInputDropdown(false);
      if (activeTextObject) {
        activeTextObject.exitEditing();
      }
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [activeTextObject]);

  const getGlassStyle = useMemo(() => {
    return (mousePos: MousePosition, isVisible: boolean) => {
      if (!isVisible) return {};
      return {
        background: `
          radial-gradient(ellipse 100px 60px at ${mousePos.x}px ${mousePos.y}px, 
            rgba(255,255,255,0.18) 0%, 
            rgba(255,255,255,0.08) 30%, 
            rgba(255,255,255,0.04) 50%,
            transparent 70%),
          radial-gradient(ellipse 50px 30px at ${mousePos.x - 15}px ${mousePos.y - 10}px, 
            rgba(255,255,255,0.22) 0%, 
            rgba(255,255,255,0.1) 40%, 
            transparent 70%)
        `,
        filter: "blur(0.8px) contrast(1.1)",
      };
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/template')
      .then((res) => res.json())
      .then((data) => {
        const names = data.map((t: any) => t.degreeName);
        setDegrees(names);
      })
      .catch((err) => console.error('Failed to load degrees:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setTemplate(reader.result as string);
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: undefined,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoadTemplate = () => {
    if (!selectedDegree) return;
    
    setFormData(prev => ({
      ...prev,
      degree: selectedDegree
    }));
    setShowForm(true);
  };


const loadTemplate = async () => {
  setIsLoading(true);
  try {
    const res = await fetch(`/api/template/${encodeURIComponent(selectedDegree)}`);
    if (!res.ok) {
      throw new Error('Template not found');
    }
    const data = await res.json();
    setTemplate(data.backgroundImage || null);
    
    // Process elements to identify placeholders
    const processedElements = data.elements.map((el: TemplateElement) => {
      let isPlaceholder = false;
      let placeholderType: 'username' | 'degree' | 'date' | 'custom' | undefined;
      
      if (el.content.includes('{{username}}')) {
        isPlaceholder = true;
        placeholderType = 'username';
        el.content = formData.username;
      } else if (el.content.includes('{{degree}}')) {
        isPlaceholder = true;
        placeholderType = 'degree';
        el.content = formData.degree;
      } else if (el.content.includes('{{date}}')) {
        isPlaceholder = true;
        placeholderType = 'date';
        el.content = formData.dateIssued;
      } else if (el.content.includes('{{')) {
        // Custom placeholder
        isPlaceholder = true;
        placeholderType = 'custom';
      }
      
      return {
        ...el,
        isPlaceholder,
        placeholderType,
        editable: true,
        selectable: true
      };
    });
    
    setElements(processedElements || []);
    setIsDegreeSet(true);
    setShowForm(false);
    
    // Store original image size
    const img = new Image();
    img.onload = () => {
      setOriginalSize({ width: img.width, height: img.height });
    };
    img.src = data.backgroundImage;
  } catch (error) {
    console.error('Error loading template:', error);
    alert('Template not found');
  } finally {
    setIsLoading(false);
  }
};
const getDropdownPosition = useCallback(() => {
  if (!activeTextObject || !editor?.canvas || !canvasRef.current) return { top: 0, left: 0 };

  const canvasRect = canvasRef.current.getBoundingClientRect();
  const textCoords = activeTextObject.calcTransformMatrix();
  
  const top = textCoords[5] + activeTextObject.getScaledHeight() + 100;
  const left = textCoords[4];
  
  return { 
    top: `${top}px`,
    left: `${left}px`
  };
}, [activeTextObject, editor]);

const handleSelectInput = (type: 'username' | 'degree' | 'date' | 'custom', value?: string) => {
  if (!activeTextObject || !editor?.canvas) return;

  let newText = '';
  switch (type) {
    case 'username':
      newText = formData.username;
      break;
    case 'degree':
      newText = formData.degree;
      break;
    case 'date':
      newText = formData.dateIssued;
      break;
    case 'custom':
      newText = value || customInputValue;
      break;
  }

  activeTextObject.set('text', newText);
  editor.canvas.renderAll();
  setShowInputDropdown(false);
  activeTextObject.exitEditing();
};

  useEffect(() => {
    if (!template || !editor?.canvas || !originalSize) return;

    const imgElement = new window.Image();
    imgElement.onload = () => {
      const naturalWidth = imgElement.width!;
      const naturalHeight = imgElement.height!;

      const scaleX = MAX_DISPLAY_WIDTH / naturalWidth;
      const scaleY = MAX_DISPLAY_HEIGHT / naturalHeight;

      const isWidthConstrained = scaleX < scaleY;
      console.log("dcscsccsdcd",scaleX, scaleY);
      if(isWidthConstrained){
        console.log("vvdsvvsvsvsd");
      }

      let displayScale = Math.min(scaleX, scaleY, 1);

      const displayWidth = naturalWidth * displayScale;
      const displayHeight = naturalHeight * displayScale;

      editor.canvas.setWidth(displayWidth);
      editor.canvas.setHeight(displayHeight);
      editor.canvas.clear();

      const imgInstance = new fabric.Image(imgElement, {
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
        hoverCursor: 'default',
      });

      imgInstance.scale(displayScale);
      imgInstance.set({ left: 0, top: 0 });

      editor.canvas.add(imgInstance);
      (imgInstance as any).sendToBack?.();

      displayScale = isWidthConstrained ? 1 : 1;

      elements.forEach((element) => {
        if (element.type === 'i-text') {
          const scaledLeft = element.left * displayScale;
          const scaledTop = element.top * displayScale;
          const scaledFontSize = element.fontSize * displayScale;

          const iText = new fabric.IText(element.content, {
            left: scaledLeft,
            top: scaledTop,
            fontSize: scaledFontSize,
            fill: element.fill,
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderColor: 'gray',
            cornerColor: 'blue',
            cornerSize: 6,
            padding: 5,
            editable: true,
            selectable: true,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            hoverCursor: 'text',
            hasControls: false,
            hasBorders: false,
            data: {
              isPlaceholder: element.isPlaceholder,
              placeholderType: element.placeholderType,
              originalContent: element.content
            }
          });
               iText.on('editing:entered', () => {
          setActiveTextObject(iText);
          setShowInputDropdown(true);
          setCustomInputValue(iText.text || '');
        });

        iText.on('editing:exited', () => {
          setShowInputDropdown(false);
          setActiveTextObject(null);
        });
          editor.canvas.add(iText);
        }
      });

      editor.canvas.renderAll();
    };
    imgElement.src = template;
  }, [template, editor, elements, originalSize]);

  const downloadCanvasAsPDF = () => {
    if (!editor || !editor.canvas || !originalSize) return;

    const canvas = editor.canvas;
    const { width: naturalWidth, height: naturalHeight } = originalSize;

    const displayWidth = canvas.getWidth();
    const displayHeight = canvas.getHeight();

    const scaleX = naturalWidth / displayWidth;
    const scaleY = naturalHeight / displayHeight;
    const exportScale = Math.min(scaleX, scaleY);

    canvas.getObjects().forEach((obj) => {
      obj.scaleX = (obj.scaleX ?? 1) * exportScale;
      obj.scaleY = (obj.scaleY ?? 1) * exportScale;
      obj.left = (obj.left ?? 0) * exportScale;
      obj.top = (obj.top ?? 0) * exportScale;
      obj.setCoords();
    });
    canvas.setWidth(naturalWidth);
    canvas.setHeight(naturalHeight);
    canvas.renderAll();

    const dataUrl = canvas.toDataURL({
      format: 'png',
      multiplier: 1,
    });

    canvas.getObjects().forEach((obj) => {
      obj.scaleX = (obj.scaleX ?? 1) / exportScale;
      obj.scaleY = (obj.scaleY ?? 1) / exportScale;
      obj.left = (obj.left ?? 0) / exportScale;
      obj.top = (obj.top ?? 0) / exportScale;
      obj.setCoords();
    });
    canvas.setWidth(displayWidth);
    canvas.setHeight(displayHeight);
    canvas.renderAll();

    const pdf = new jsPDF({
      orientation: naturalWidth > naturalHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [naturalWidth, naturalHeight],
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, naturalWidth, naturalHeight);
    pdf.save(`${formData.username.replace(/\s+/g, '_')}_${selectedDegree.replace(/\s+/g, '_')}_certificate.pdf`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loadTemplate(); // Changed from directly calling downloadCanvasAsPDF

    try {
      if (editor?.canvas) {
        const objects = editor.canvas.getObjects();
        objects.forEach((obj) => {
          if (obj.type === 'i-text') {
            const textObj = obj as fabric.IText;
            if (textObj.text?.includes('Certificate Title')) {
              textObj.set({ text: `${formData.degree} Certificate` });
            }
            if (textObj.text?.includes('Recipient Name')) {
              textObj.set({ text: formData.username });
            }
            if (textObj.text?.includes('Date Issued')) {
              textObj.set({ text: `Issued on: ${formData.dateIssued}` });
            }
          }
        });
        editor.canvas.renderAll();
      }
      
      downloadCanvasAsPDF();
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 0: Degree selector
  if (!isDegreeSet && !showForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-8 max-w-md w-full space-y-6 border border-white/20">
          <div className="text-center">
            <h2 className="text-2xl font-light text-white mb-2 tracking-wide">
              Choose Degree Template
            </h2>
            <p className="text-white/60 text-sm">Select a template to begin creating your certificate</p>
          </div>

          <div className="space-y-4">
            <div
              ref={selectorRef}
              onMouseMove={(e) => handleMouseMove(e.nativeEvent, setSelectorMousePosition, selectorRef)}
              onMouseEnter={() => setIsSelectorHovering(true)}
              onMouseLeave={() => setIsSelectorHovering(false)}
              className="relative overflow-hidden rounded-lg"
            >
              {isSelectorHovering && (
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={getGlassStyle(selectorMousePosition, isSelectorHovering)}
                  aria-hidden="true"
                />
              )}
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                disabled={isLoading}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 appearance-none cursor-pointer disabled:opacity-50 relative z-10"
              >
                <option value="" className="bg-slate-800 text-white">
                  {isLoading ? 'Loading templates...' : '-- Select Degree --'}
                </option>
                {degrees.map((deg) => (
                  <option key={deg} value={deg} className="bg-slate-800 text-white">
                    {deg}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none z-20" />
            </div>

            <button
              ref={loadButtonRef}
              onMouseMove={(e) => handleMouseMove(e.nativeEvent, setLoadButtonMousePosition, loadButtonRef)}
              onMouseEnter={() => setIsLoadButtonHovering(true)}
              onMouseLeave={() => setIsLoadButtonHovering(false)}
              onClick={handleLoadTemplate}
              disabled={!selectedDegree || isLoading}
              className="relative overflow-hidden w-full bg-blue-600/20 backdrop-blur-md text-white px-6 py-3 rounded-lg border border-blue-400/30 hover:bg-blue-600/30 hover:border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadButtonHovering && !isLoading && (
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={getGlassStyle(loadButtonMousePosition, isLoadButtonHovering)}
                  aria-hidden="true"
                />
              )}
              <div className="flex items-center justify-center relative z-10">
                <Eye className="w-5 h-5 mr-2" />
                {isLoading ? 'Loading...' : 'Load Template'}
              </div>
            </button>

            <button
              onClick={onBack}
              className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30"
            >
              <div className="flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: Form for certificate details
  if (showForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-8 max-w-md w-full space-y-6 border border-white/20">
          <div className="text-center">
            <h2 className="text-2xl font-light text-white mb-2 tracking-wide">
              Certificate Details
            </h2>
            <p className="text-white/60 text-sm">Fill in the details for your certificate</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/80 text-sm">Recipient Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                placeholder="Enter recipient name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                readOnly
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm">Date Issued</label>
              <input
                type="date"
                name="dateIssued"
                value={formData.dateIssued}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="flex space-x-4 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600/20 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-blue-400/30 hover:bg-blue-600/30 hover:border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Generate Certificate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // STEP 2: Canvas preview screen
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 space-y-6 border border-white/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
            <Palette className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-xl font-light text-white mb-2 tracking-wide">Certificate Designer</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-sm text-white/60 mb-1">Active Template</p>
            <p className="text-blue-400 font-medium">{selectedDegree}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <Eye className="w-4 h-4 mr-2 text-blue-400" />
              Canvas Controls
            </h3>
            <p className="text-white/60 text-sm">
              The template is automatically loaded with all elements in their correct positions.
            </p>
          </div>

          <button
            onClick={() => {
              if (editor?.canvas) {
                editor.canvas.clear();
              }
              setIsDegreeSet(false);
              setSelectedDegree('');
              setTemplate(null);
              setElements([]);
              setShowForm(false);
            }}
            className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30"
          >
            <div className="flex items-center justify-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              Change Template
            </div>
          </button>
          <button
            onClick={downloadCanvasAsPDF}
            disabled={isLoading}
            className="w-full bg-green-600/20 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-green-400/30 hover:bg-green-600/30 hover:border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              {isLoading ? 'Exporting...' : 'Export as PDF'}
            </div>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30"
          >
            <div className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </div>
          </button>
          <button
            onClick={onBack}
            className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30"
          >
            <div className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </div>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20 animate-slide-right">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-light text-white tracking-wide">Certificate Preview</h2>
            <p className="text-white/60 text-sm mt-1">Template: {selectedDegree}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-medium">Live Preview</span>
          </div>
        </div>

          <div
            ref={canvasRef}
            onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCanvasMousePosition, canvasRef)}
            onMouseEnter={() => setIsCanvasHovering(true)}
            onMouseLeave={() => setIsCanvasHovering(false)}
            className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-4 smooth-transition hover:border-white/30"
          >
            {isCanvasHovering && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                style={getGlassStyle(canvasMousePosition, isCanvasHovering)}
                aria-hidden="true"
              />
            )}
            <div className="relative z-10">
              <FabricJSCanvas className="canvas rounded-md" onReady={onReady} />
            </div>
          </div>
          {showInputDropdown && activeTextObject && (
      <div 
        ref={dropdownRef}
        className="absolute z-50 bg-slate-800 rounded-lg shadow-lg border border-slate-700 mt-1"
        style={getDropdownPosition()}
      >
        <div 
          className="px-4 py-2 hover:bg-slate-700 cursor-pointer border-b border-slate-700"
          onClick={() => handleSelectInput('username')}
        >
          {formData.username}
        </div>
        <div 
          className="px-4 py-2 hover:bg-slate-700 cursor-pointer border-b border-slate-700"
          onClick={() => handleSelectInput('degree')}
        >
          {formData.degree}
        </div>
        <div 
          className="px-4 py-2 hover:bg-slate-700 cursor-pointer border-b border-slate-700"
          onClick={() => handleSelectInput('date')}
        >
          {formData.dateIssued}
        </div>
      </div>
    )}
      </div>
    </div>
  );
}