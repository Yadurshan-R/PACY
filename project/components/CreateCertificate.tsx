'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import * as fabric from 'fabric';
import { Download, ArrowLeft, RotateCcw, Eye, Palette, ChevronDown, Send, QrCode } from 'lucide-react';
import jsPDF from 'jspdf';
import { useDropzone } from 'react-dropzone';
import { mintCertificate } from '@/lib/mintCertificate';
import { buildCertificateMetadata } from '@/utils/metadataBuilder';
import { useWallet } from '@meshsdk/react';
import QRCode from 'react-qr-code';
import { createRoot } from 'react-dom/client';

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
  isPlaceholder?: boolean;
  placeholderType?: 'username' | 'nic' | 'degree' | 'date' | 'custom';
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
    nic: '',
    degree: '',
    dateIssued: new Date().toISOString().split('T')[0],
  });
  const [activeTextObject, setActiveTextObject] = useState<fabric.IText | null>(null);
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [qrCodePlaced, setQrCodePlaced] = useState(false);
  const { wallet, connected } = useWallet();

  // Glass effect states
  const [selectorMousePosition, setSelectorMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isSelectorHovering, setIsSelectorHovering] = useState(false);
  const [loadButtonMousePosition, setLoadButtonMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoadButtonHovering, setIsLoadButtonHovering] = useState(false);
  const [canvasMousePosition, setCanvasMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCanvasHovering, setIsCanvasHovering] = useState(false);
  const [exported, setExported] = useState(false);

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
        mask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
        maskComposite: "xor" as const,
        WebkitMask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
        WebkitMaskComposite: "xor" as const,
        padding: "1px",
        filter: "blur(0.8px) contrast(1.1)",
      };
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/${localStorage.getItem("userId")}/template`)
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
      const res = await fetch(`/api/${localStorage.getItem("userId")}/template/${encodeURIComponent(selectedDegree)}`);
      if (!res.ok) {
        throw new Error('Template not found');
      }
      const data = await res.json();
      setTemplate(data.backgroundImage || null);
      
      const processedElements = data.elements.map((el: TemplateElement) => {
        let isPlaceholder = false;
        let placeholderType: 'username' | 'nic' | 'degree' | 'date' | 'custom' | undefined;
        
        if (el.content.includes('{{username}}')) {
          isPlaceholder = true;
          placeholderType = 'username';
          el.content = formData.username;
        } else if (el.content.includes('{{nic}}')) {
          isPlaceholder = true;
          placeholderType = 'nic';
          el.content = formData.nic;
        } else if (el.content.includes('{{degree}}')) {
          isPlaceholder = true;
          placeholderType = 'degree';
          el.content = formData.degree;
        } else if (el.content.includes('{{date}}')) {
          isPlaceholder = true;
          placeholderType = 'date';
          el.content = formData.dateIssued;
        } else if (el.content.includes('{{')) {
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

  const handleSelectInput = (type: 'username' | 'nic' | 'degree' | 'date' | 'custom', value?: string) => {
    if (!activeTextObject || !editor?.canvas) return;

    let newText = '';
    switch (type) {
      case 'username':
        newText = formData.username;
        break;
      case 'nic':
        newText = formData.nic;
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

  const handleSubmitToBlockchain = async () => {
    if (!connected || !wallet) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const metadata = buildCertificateMetadata(
        formData.username,
        formData.nic,
        formData.degree,
        formData.dateIssued
      );
      
      const { txHash } = await mintCertificate(
        wallet,
        metadata,
        formData.username,
        formData.nic,
        formData.degree,
        formData.dateIssued
      );
      
      setTxHash(txHash);
      setShowQRCodeModal(true);
    } catch (error) {
      console.error('Error minting certificate:', error);
      alert('Failed to mint certificate: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeQRCodeOnCanvas = async () => {
    if (!editor || !editor.canvas || !txHash || !originalSize) return;

    const verificationUrl = `${window.location.origin}/certificate/${txHash}`;
    
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    const root = createRoot(tempDiv);
    root.render(
      <div style={{ background: 'white', padding: '8px' }}>
        <QRCode 
          value={verificationUrl}
          size={128}
          level="H"
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
    );

    await new Promise(resolve => setTimeout(resolve, 50));

    const svgElement = tempDiv.querySelector('svg');
    if (!svgElement) {
      root.unmount();
      document.body.removeChild(tempDiv);
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml'});
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = await new Promise<fabric.Image>((resolve, reject) => {
      const imgElement = new Image();
      
      imgElement.onload = () => {
        const imgInstance = new fabric.Image(imgElement, {
          crossOrigin: 'anonymous'
        });
        resolve(imgInstance);
      };
      
      imgElement.onerror = (err) => {
        reject(err);
      };
      
      imgElement.src = svgUrl;
      imgElement.crossOrigin = 'anonymous';
    });

    const scaleX = editor.canvas.getWidth() / originalSize.width;
    const scaleY = editor.canvas.getHeight() / originalSize.height;
    const scale = Math.min(scaleX, scaleY);

    const centerX = (editor.canvas.getWidth() - (img.width || 0) * 1) / 2;
    const centerY = (editor.canvas.getHeight() - (img.height || 0) * 1) / 2;

    img.set({
      left: centerX,
      top: centerY,
      scaleX: scale,
      scaleY: scale,
      selectable: true,
      hasControls: true,
      lockRotation: true,
      cornerSize: 8,
      transparentCorners: false,
      borderColor: 'blue',
      cornerColor: 'blue',
      name: 'verification-qr-code',
      data: { isQRCode: true }
    });

    img.on('modified', () => {
      setQrCodePlaced(true);
    });

    editor.canvas.add(img);
    editor.canvas.renderAll();
    setQrCodePlaced(true);
    setShowQRCodeModal(false);

    root.unmount();
    document.body.removeChild(tempDiv);
    URL.revokeObjectURL(svgUrl);
  };

  const downloadCanvasAsPDF = () => {
    if (!editor || !editor.canvas || !originalSize || !qrCodePlaced) {
      alert('Please place the QR code on the certificate before exporting');
      return;
    }

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

    setExported(true);
    setTimeout(() => onBack(), 1000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loadTemplate();

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
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
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
        @keyframes gentleBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .animate-fade-in {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-stagger-1 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .animate-stagger-2 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .smooth-transition {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-lift:hover {
          transform: translateY(-1px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-stagger-1,
          .animate-stagger-2,
          .gentle-bounce {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .smooth-transition,
          .hover-lift:hover {
            transition: none;
          }
        }
      `}</style>

      {!isDegreeSet && !showForm && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full space-y-6 border border-white/20 animate-stagger-1">
          <div className="text-center">
            <h2 className="text-2xl font-light text-white mb-2 tracking-normal">
              Choose Degree Template
            </h2>
            <p className="text-white/70 text-sm">Select a template to begin creating your certificate</p>
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
                  className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
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
                <option value="" className="bg-gray-900 text-white">
                  {isLoading ? 'Loading templates...' : '-- Select Degree --'}
                </option>
                {degrees.map((deg) => (
                  <option key={deg} value={deg} className="bg-gray-900 text-white">
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
              className="relative overflow-hidden w-full bg-emerald-600/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-emerald-600/30 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
            >
              {isLoadButtonHovering && !isLoading && (
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
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
              className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift"
            >
              <div className="flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </div>
            </button>
          </div>
        </div>
      </div>
    )}

      {/* STEP 1: Form for certificate details */}
      {showForm && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full space-y-6 border border-white/20 animate-stagger-1">
          <div className="text-center">
            <h2 className="text-2xl font-light text-white mb-2 tracking-normal">
              Certificate Details
            </h2>
            <p className="text-white/70 text-sm">Fill in the details for your certificate</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/80 text-sm">Full Name</label>
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
              <label className="text-white/80 text-sm">NIC Number</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                placeholder="Enter NIC number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/80 text-sm">Course</label>
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
                className="flex-1 bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-emerald-600/20 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-emerald-600/30 hover:border-white/40 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Generate Certificate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

  {/* STEP 2: Canvas preview screen */}
  {isDegreeSet && !showForm && (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6 border border-white/20 animate-stagger-1">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Palette className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-light text-white mb-2 tracking-normal">Certificate Designer</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-sm text-white/70 mb-1">Active Template</p>
            <p className="text-emerald-400 font-medium">{selectedDegree}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <Send className="w-4 h-4 mr-2 text-emerald-400" />
              Blockchain Submission
            </h3>
            <p className="text-white/70 text-sm mb-3">
              Submit the certificate details to the blockchain for permanent verification.
            </p>
            {!qrCodePlaced && (
            <button
              onClick={handleSubmitToBlockchain}
              disabled={isSubmitting || !connected}
              className="w-full bg-purple-600/20 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-purple-600/30 hover:border-white/40 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit to Blockchain'}
              </div>
            </button>
            )}
            {txHash && (
              <div className="mt-3 p-2 bg-emerald-900/20 rounded text-xs text-emerald-200 break-all">
                <p className="font-medium">Successfully Completed</p>
              </div>
            )}
          </div>

          {/* QR Code Placement Modal */}
          {showQRCodeModal && (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-medium text-white mb-4 flex items-center">
          <QrCode className="w-5 h-5 mr-2 text-emerald-400" />
          Place Verification QR Code
        </h3>
        <p className="text-white/70 mb-4">
          The QR code will be placed centered on your certificate. You can then drag it to the desired position.
        </p>
        
        <div className="flex justify-center mb-6 p-4 bg-white rounded">
          <QRCode 
            value={`${window.location.origin}/certificate/${txHash}`}
            size={128}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={placeQRCodeOnCanvas}
            className="flex-1 bg-emerald-600/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-emerald-600/30 hover:border-white/40 hover-lift"
          >
            Place QR Code on Certificate
          </button>
        </div>
      </div>
    </div>
  )}

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <Eye className="w-4 h-4 mr-2 text-emerald-400" />
              Canvas Controls
            </h3>
            <p className="text-white/70 text-sm">
              The template is automatically loaded with all elements in their correct positions.
            </p>
          </div>
          {exported && (
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
            className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift"
          >
            <div className="flex items-center justify-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              Change Template
            </div>
          </button>
          )}

          <button
            onClick={downloadCanvasAsPDF}
            disabled={!qrCodePlaced || isLoading}
            className={`w-full ${qrCodePlaced ? 'bg-emerald-600/20 hover:bg-emerald-600/30' : 'bg-white/10'} backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:border-white/40 hover-lift disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              {qrCodePlaced ? 'Export as PDF' : 'Place QR Code First'}
            </div>
          </button>
          {exported && !showQRCodeModal && (

          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift"
          >
            <div className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </div>
          </button>
          )}
          {exported && !showQRCodeModal && (

          <button
            onClick={onBack}
            className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift"
          >
            <div className="flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </div>
          </button>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-stagger-2">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-light text-white tracking-normal">Certificate Preview</h2>
            <p className="text-white/70 text-sm mt-1">Template: {selectedDegree}</p>
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
          className="relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 smooth-transition hover:border-white/40 hover-lift"
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
            className="absolute z-50 bg-gray-800 rounded-lg shadow-lg border border-white/20 mt-1"
            style={getDropdownPosition()}
          >
            <div 
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20"
              onClick={() => handleSelectInput('username')}
            >
              {formData.username}
            </div>
            <div 
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20"
              onClick={() => handleSelectInput('nic')}
            >
              {formData.nic}
            </div>
            <div 
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20"
              onClick={() => handleSelectInput('degree')}
            >
              {formData.degree}
            </div>
            <div 
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20"
              onClick={() => handleSelectInput('date')}
            >
              {formData.dateIssued}
            </div>
          </div>
        )}
      </div>
    </div>
      )}
    </>
  );
}