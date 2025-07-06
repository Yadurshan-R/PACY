import { useState, useRef, useCallback, useMemo } from 'react';
import { Award, FileText, Table } from 'lucide-react';
import { useWallet } from '@meshsdk/react';
import Link from 'next/link';

interface MousePosition {
  x: number;
  y: number;
}

interface Props {
  onCreateTemplate: () => void;
  onCreateCertificate: () => void;
}

export default function ActionButtons({ onCreateTemplate, onCreateCertificate }: Props) {
  const { connected } = useWallet();
  const [certMousePosition, setCertMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCertHovering, setIsCertHovering] = useState(false);
  const [templateMousePosition, setTemplateMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isTemplateHovering, setIsTemplateHovering] = useState(false);
  const [showWalletTooltip, setShowWalletTooltip] = useState(false);

  const certRef = useRef<HTMLButtonElement>(null);
  const templateRef = useRef<HTMLButtonElement>(null);

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

  const handleCertificateClick = () => {
    if (!connected) {
      setShowWalletTooltip(true);
      return;
    }
    onCreateCertificate();
  };

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

  return (
    <>
      <style jsx>{`
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
        .gentle-bounce {
          animation: gentleBounce 3s ease-in-out infinite;
        }
        .tooltip {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
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
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative">
        <div className="relative animate-stagger-1">
          <button
            ref={certRef}
            onClick={handleCertificateClick}
            onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCertMousePosition, certRef)}
            onMouseEnter={() => setIsCertHovering(true)}
            onMouseLeave={() => {
              setIsCertHovering(false);
              setShowWalletTooltip(false);
            }}
className={`relative overflow-hidden flex items-center px-8 py-4 text-white text-lg font-medium rounded-lg smooth-transition hover-lift animate-stagger-2 ${
  connected
    ? 'bg-blue-500 hover:bg-blue-600'
    : 'bg-blue-500 cursor-not-allowed'
}`}
          >
            {isCertHovering && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                style={getGlassStyle(certMousePosition, isCertHovering)}
                aria-hidden="true"
              />
            )}
            <Award className="w-6 h-6 mr-3 relative z-10" />
            <span className="relative z-10">Create Certificates</span>
          </button>

          {showWalletTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2 px-3 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg border border-white/10 shadow-lg tooltip z-10">
              Please connect your wallet first
              <div className="absolute top-full left-1/2 w-3 h-3 bg-black/80 transform -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10"></div>
            </div>
          )}
        </div>

        <button
          ref={templateRef}
          onClick={onCreateTemplate}
          onMouseMove={(e) => handleMouseMove(e.nativeEvent, setTemplateMousePosition, templateRef)}
          onMouseEnter={() => setIsTemplateHovering(true)}
          onMouseLeave={() => setIsTemplateHovering(false)}
          className="relative overflow-hidden flex items-center px-8 py-4 bg-emerald-500 text-white text-lg font-medium rounded-lg hover:bg-emerald-400 smooth-transition hover-lift animate-stagger-2"
        >
          {isTemplateHovering && (
            <div
              className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
              style={getGlassStyle(templateMousePosition, isTemplateHovering)}
              aria-hidden="true"
            />
          )}
          <FileText className="w-6 h-6 mr-3 relative z-10" />
          <span className="relative z-10">Create Templates</span>
        </button>
        <Link href="/student-records">
        <button
          className="relative overflow-hidden flex items-center px-8 py-4 bg-purple-500 backdrop-blur-sm text-white text-lg font-medium rounded-lg hover:bg-purple-400 smooth-transition hover-lift animate-stagger-2"
        >
          <Table className="w-6 h-6 mr-3 relative z-10" />
          <span className="relative z-10">View Student Records</span>
        </button>
        </Link>
      </div>
    </>
  );
}
