
// InfoCards Component
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
          radial-gradient(ellipse 120px 80px at ${mousePos.x}px ${mousePos.y}px, 
            rgba(255,255,255,0.15) 0%, 
            rgba(255,255,255,0.08) 30%, 
            rgba(255,255,255,0.03) 50%,
            transparent 70%),
          radial-gradient(ellipse 60px 40px at ${mousePos.x - 15}px ${mousePos.y - 10}px, 
            rgba(255,255,255,0.2) 0%, 
            rgba(255,255,255,0.1) 40%, 
            transparent 70%)
        `,
        filter: "blur(0.8px) contrast(1.1)",
      };
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          ref={card1Ref}
          onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCard1MousePosition, card1Ref)}
          onMouseEnter={() => setIsCard1Hovering(true)}
          onMouseLeave={() => setIsCard1Hovering(false)}
          className="relative overflow-hidden p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-center smooth-transition hover:bg-white/15 hover:border-white/30 shadow-2xl hover:shadow-white/10 hover-lift"
        >
          {isCard1Hovering && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none smooth-transition"
              style={getGlassStyle(card1MousePosition, isCard1Hovering)}
              aria-hidden="true"
            />
          )}
          <Award className="w-12 h-12 text-blue-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-lg font-semibold text-white mb-2 relative z-10">Secure Certificates</h3>
          <p className="text-white/70 relative z-10">Issue tamper-proof certificates on the blockchain</p>
        </div>

        <div
          ref={card2Ref}
          onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCard2MousePosition, card2Ref)}
          onMouseEnter={() => setIsCard2Hovering(true)}
          onMouseLeave={() => setIsCard2Hovering(false)}
          className="relative overflow-hidden p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-center smooth-transition hover:bg-white/15 hover:border-white/30 shadow-2xl hover:shadow-white/10 hover-lift"
        >
          {isCard2Hovering && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none smooth-transition"
              style={getGlassStyle(card2MousePosition, isCard2Hovering)}
              aria-hidden="true"
            />
          )}
          <FileText className="w-12 h-12 text-emerald-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-lg font-semibold text-white mb-2 relative z-10">Custom Templates</h3>
          <p className="text-white/70 relative z-10">Design beautiful certificate templates for any occasion</p>
        </div>

        <div
          ref={card3Ref}
          onMouseMove={(e) => handleMouseMove(e.nativeEvent, setCard3MousePosition, card3Ref)}
          onMouseEnter={() => setIsCard3Hovering(true)}
          onMouseLeave={() => setIsCard3Hovering(false)}
          className="relative overflow-hidden p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-center smooth-transition hover:bg-white/15 hover:border-white/30 shadow-2xl hover:shadow-white/10 hover-lift"
        >
          {isCard3Hovering && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none smooth-transition"
              style={getGlassStyle(card3MousePosition, isCard3Hovering)}
              aria-hidden="true"
            />
          )}
          <Wallet className="w-12 h-12 text-purple-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-lg font-semibold text-white mb-2 relative z-10">Wallet Integration</h3>
          <p className="text-white/70 relative z-10">Connect your wallet for seamless blockchain transactions</p>
        </div>
      </div>
    </>
  );
}