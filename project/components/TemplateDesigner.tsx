'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import * as fabric from 'fabric';
import { jsPDF } from 'jspdf';
import { Download, UploadCloud, Type, Palette, Save, Trash2, RotateCcw, Sparkles, ArrowLeft } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

interface TemplateDesignerProps {
  onBack: () => void;
}

export default function TemplateDesigner({onBack}: TemplateDesignerProps) {
  const [template, setTemplate] = useState<string | null>(null);
  const [degreeName, setDegreeName] = useState('');
  const [isDegreeSet, setIsDegreeSet] = useState(false);
  const { editor, onReady } = useFabricJSEditor();

  // Glass effect states
  const [degreeInputMousePosition, setDegreeInputMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isDegreeInputHovering, setIsDegreeInputHovering] = useState(false);
  const [startButtonMousePosition, setStartButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isStartButtonHovering, setIsStartButtonHovering] = useState(false);
  const [canvasMousePosition, setCanvasMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCanvasHovering, setIsCanvasHovering] = useState(false);
  const [uploadMousePosition, setUploadMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isUploadHovering, setIsUploadHovering] = useState(false);

  // Refs for glass effect
  const degreeInputRef = useRef<HTMLInputElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);

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

  const MAX_DISPLAY_WIDTH = 800;
  const MAX_DISPLAY_HEIGHT = 600;

  useEffect(() => {
    if (!template || !editor?.canvas) return;

    const imgElement = new window.Image();
    imgElement.onload = () => {
      const naturalWidth = imgElement.width!;
      const naturalHeight = imgElement.height!;

      setOriginalSize({ width: naturalWidth, height: naturalHeight });

      // Calculate scale to fit display area
      const scaleX = MAX_DISPLAY_WIDTH / naturalWidth;
      const scaleY = MAX_DISPLAY_HEIGHT / naturalHeight;
      const displayScale = Math.min(scaleX, scaleY, 1); // Don't upscale beyond 1

      const displayWidth = naturalWidth * displayScale;
      const displayHeight = naturalHeight * displayScale;

      // Set canvas display size (smaller)
      editor.canvas.setWidth(displayWidth);
      editor.canvas.setHeight(displayHeight);
      editor.canvas.clear();

      // Add background image scaled for display
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: undefined,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
  });

  const saveTemplateToServer = async () => {
    if (!editor?.canvas || !originalSize) return;

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
        selectable: false,
      };
    });

    const backgroundImage = template;
    try {
      await fetch(`/api/${localStorage.getItem("userId")}/template`, {
        method: 'POST',
        body: JSON.stringify({
          degreeName,
          elements,
          backgroundImage,
          originalWidth: originalSize.width,
          originalHeight: originalSize.height,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      onBack();
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  if (!isDegreeSet) {
    return (
      <>
        <style jsx>{`
          @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }
            50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }
          }
          @keyframes slideUp {
            0% { 
              opacity: 0; 
              transform: translateY(30px) scale(0.95);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) scale(1);
            }
          }
          @keyframes slideUpStaggered {
            0% { 
              opacity: 0; 
              transform: translateY(20px);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0);
            }
          }
          @keyframes pulseGlow {
            0%, 100% { 
              box-shadow: 0 0 0 rgba(139, 92, 246, 0);
            }
            50% { 
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
            }
          }
          .animate-fade-in {
            animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-stagger-1 {
            animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
          }
          .animate-stagger-2 {
            animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
          }
          .animate-stagger-3 {
            animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          }
          .hover-lift:hover {
            transform: translateY(-2px);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .smooth-transition {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .pulse-glow {
            animation: pulseGlow 3s ease-in-out infinite;
          }
        `}</style>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4">
          <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-8 max-w-md w-full space-y-6 border border-white/20 animate-fade-in">
            <div className="text-center animate-stagger-1">
              <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h2
                className="text-2xl font-light text-white mb-2 tracking-wide"
                style={{
                  animation: "textGlow 6s ease-in-out infinite",
                }}
              >
                Create Template
              </h2>
              <p className="text-white/60 text-sm">Design a new certificate template from scratch</p>
            </div>

            <div className="space-y-4 animate-stagger-2">
              <div
                ref={degreeInputRef}
                onMouseMove={(e) => handleMouseMove(e.nativeEvent, setDegreeInputMousePosition, degreeInputRef)}
                onMouseEnter={() => setIsDegreeInputHovering(true)}
                onMouseLeave={() => setIsDegreeInputHovering(false)}
                className="relative overflow-hidden rounded-lg"
              >
                {isDegreeInputHovering && (
                  <div
                    className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                    style={getGlassStyle(degreeInputMousePosition, isDegreeInputHovering)}
                    aria-hidden="true"
                  />
                )}
                <input
                  type="text"
                  placeholder="Enter Degree Name (e.g., Bachelor of Design)"
                  value={degreeName}
                  onChange={(e) => setDegreeName(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 smooth-transition relative z-10"
                />
              </div>

              <button
                ref={startButtonRef}
                onMouseMove={(e) => handleMouseMove(e.nativeEvent, setStartButtonMousePosition, startButtonRef)}
                onMouseEnter={() => setIsStartButtonHovering(true)}
                onMouseLeave={() => setIsStartButtonHovering(false)}
                onClick={() => {
                  if (degreeName.trim()) setIsDegreeSet(true);
                }}
                disabled={!degreeName.trim()}
                className="relative overflow-hidden w-full bg-purple-600/20 backdrop-blur-md text-white px-6 py-3 rounded-lg border border-purple-400/30 hover:bg-purple-600/30 hover:border-purple-400/50 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed hover-lift pulse-glow animate-stagger-3"
              >
                {isStartButtonHovering && degreeName.trim() && (
                  <div
                    className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                    style={getGlassStyle(startButtonMousePosition, isStartButtonHovering)}
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center justify-center relative z-10">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Designing
                </div>
              </button>
              <button
                onClick={onBack}
                className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 smooth-transition hover-lift"
              >
                <div className="flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideInLeft {
          0% { 
            opacity: 0; 
            transform: translateX(-30px);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          0% { 
            opacity: 0; 
            transform: translateX(30px);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
        .animate-slide-left {
          animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-right {
          animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 min-h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 space-y-6 border border-white/20 animate-slide-left">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
              <Palette className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-xl font-light text-white mb-2 tracking-wide">Template Designer</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <p className="text-sm text-white/60 mb-1">Creating Template</p>
              <p className="text-purple-400 font-medium">{degreeName}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Type className="w-4 h-4 mr-2 text-purple-400" />
              Add Elements
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => addTextField('Certificate Title')}
                className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 smooth-transition hover-lift text-sm"
              >
                <Type className="w-4 h-4 mr-2 inline" /> Title
              </button>
              <button
                onClick={() => addTextField('Text Field')}
                className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 smooth-transition hover-lift text-sm"
              >
                <Type className="w-4 h-4 mr-2 inline" /> Text Field
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-medium mb-3 flex items-center">
              <UploadCloud className="w-4 h-4 mr-2 text-purple-400" />
              Background Image
            </h3>
            <div
              ref={uploadRef}
              onMouseMove={(e) => handleMouseMove(e.nativeEvent, setUploadMousePosition, uploadRef)}
              onMouseEnter={() => setIsUploadHovering(true)}
              onMouseLeave={() => setIsUploadHovering(false)}
              {...getRootProps()}
              className="relative overflow-hidden flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-purple-400/50 hover:bg-white/5 text-center smooth-transition"
            >
              {isUploadHovering && (
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                  style={getGlassStyle(uploadMousePosition, isUploadHovering)}
                  aria-hidden="true"
                />
              )}
              <input {...getInputProps()} />
              <div className="relative z-10">
                <UploadCloud className="w-6 h-6 text-white/60 mb-2 mx-auto" />
                <p className="text-sm text-white/60">Drop or select image</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setIsDegreeSet(false);
                setTemplate(null);
              }}
              className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30"
            >
              <div className="flex items-center justify-center">
                <RotateCcw className="w-4 h-4 mr-2" />
                Change Degree
              </div>
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
              className="w-full bg-red-500/20 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-red-400/30 hover:bg-red-500/30 hover:border-red-400/50 smooth-transition hover-lift"
            >
              <Trash2 className="w-4 h-4 mr-2 inline" />
              Delete Selected
            </button>

            <button
              onClick={saveTemplateToServer}
              className="w-full bg-emerald-600/20 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-emerald-400/30 hover:bg-emerald-600/30 hover:border-emerald-400/50 smooth-transition hover-lift"
            >
              <Save className="w-4 h-4 mr-2 inline" />
              Save Template
            </button>

            <button
              onClick={onBack}
              className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 smooth-transition hover-lift"
            >
              <div className="flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </div>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20 animate-slide-right">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-light text-white tracking-wide">Design Canvas</h2>
              <p className="text-white/60 text-sm mt-1">Template: {degreeName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-400 text-sm font-medium">Live Design</span>
              </div>
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
        </div>
      </div>
    </>
  );
}