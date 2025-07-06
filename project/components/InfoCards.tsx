import { useState, useRef, useCallback, useMemo } from 'react';
import { Award, FileText, Wallet } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

export default function InfoCards() {
  const [card1MousePosition, setCard1MousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCard1Hovering, setIsCard1Hovering] = useState(false);
  const [card2MousePosition, setCard2MousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCard2Hovering, setIsCard2Hovering] = useState(false);
  const [card3MousePosition, setCard3MousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isCard3Hovering, setIsCard3Hovering] = useState(false);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

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
        .animate-stagger-3 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
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
        @media (prefers-reduced-motion: reduce) {
          .animate-stagger-1,
          .animate-stagger-2,
          .animate-stagger-3,
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          ref={card1Ref}
          onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCard1MousePosition, card1Ref)}
          onMouseEnter={() => setIsCard1Hovering(true)}
          onMouseLeave={() => setIsCard1Hovering(false)}
          className="relative overflow-hidden p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-center smooth-transition hover:bg-white/15 hover:border-white/40 hover-lift animate-stagger-1"
        >
          {isCard1Hovering && (
            <div
              className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
              style={getGlassStyle(card1MousePosition, isCard1Hovering)}
              aria-hidden="true"
            />
          )}
          <Award className="w-10 h-10 text-blue-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-lg font-medium text-white mb-2 relative z-10">Secure Certificates</h3>
          <p className="text-white/70 text-sm relative z-10">Issue tamper-proof certificates on the blockchain</p>
        </div>

        <div
          ref={card2Ref}
          onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCard2MousePosition, card2Ref)}
          onMouseEnter={() => setIsCard2Hovering(true)}
          onMouseLeave={() => setIsCard2Hovering(false)}
          className="relative overflow-hidden p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-center smooth-transition hover:bg-white/15 hover:border-white/40 hover-lift animate-stagger-2"
        >
          {isCard2Hovering && (
            <div
              className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
              style={getGlassStyle(card2MousePosition, isCard2Hovering)}
              aria-hidden="true"
            />
          )}
          <FileText className="w-10 h-10 text-emerald-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-lg font-medium text-white mb-2 relative z-10">Custom Templates</h3>
          <p className="text-white/70 text-sm relative z-10">Design beautiful certificate templates for any occasion</p>
        </div>

        <div
          ref={card3Ref}
          onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCard3MousePosition, card3Ref)}
          onMouseEnter={() => setIsCard3Hovering(true)}
          onMouseLeave={() => setIsCard3Hovering(false)}
          className="relative overflow-hidden p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-center smooth-transition hover:bg-white/15 hover:border-white/40 hover-lift animate-stagger-3"
        >
          {isCard3Hovering && (
            <div
              className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
              style={getGlassStyle(card3MousePosition, isCard3Hovering)}
              aria-hidden="true"
            />
          )}
          <Wallet className="w-10 h-10 text-purple-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-lg font-medium text-white mb-2 relative z-10">Wallet Integration</h3>
          <p className="text-white/70 text-sm relative z-10">Connect your wallet for seamless blockchain transactions</p>
        </div>
      </div>
    </>
  );
}