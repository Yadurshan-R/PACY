"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Wallet, User, ExternalLink } from "lucide-react";
import { useWallet } from "@meshsdk/react";
import { toast } from "sonner";

interface MousePosition {
  x: number;
  y: number;
}

interface HeaderProps {
  onWalletStatusChange?: (isConnected: boolean) => void;
  walletAddress?: string | null;
  onBack: () => void;
  currentView?: 'home' | 'designer' | 'certificate';
}

export default function Header({
  onWalletStatusChange,
  walletAddress,
  onBack,
  currentView,
}: HeaderProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [walletMousePosition, setWalletMousePosition] = useState<MousePosition>(
    { x: 0, y: 0 }
  );
  const [isWalletHovering, setIsWalletHovering] = useState(false);
  const [profileMousePosition, setProfileMousePosition] =
    useState<MousePosition>({ x: 0, y: 0 });
  const [isProfileHovering, setIsProfileHovering] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [isCheckingWallet, setIsCheckingWallet] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const walletRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { connected, wallet, connect, disconnect } = useWallet();

  useEffect(() => {
    const imageFromSession = sessionStorage.getItem("logo");
    if (imageFromSession) {
      setBase64Image(imageFromSession);
    }
  }, []);

  useEffect(() => {
    if (onWalletStatusChange) {
      onWalletStatusChange(connected);
    }
  }, [connected, onWalletStatusChange]);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      walletRef.current &&
      !walletRef.current.contains(event.target as Node)
    ) {
      setShowWalletPopup(false);
    }
    
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  useEffect(() => {
    if (showWalletPopup) {
      setIsProfileDropdownOpen(false);
    }
  }, [showWalletPopup]);

  useEffect(() => {
    if (isProfileDropdownOpen) {
      setShowWalletPopup(false);
    }
  }, [isProfileDropdownOpen]);

  const handleWalletAction = async () => {
    if (connected) {
      await handleDisconnect();
      return;
    }

    setIsCheckingWallet(true);
    try {
      if (typeof window !== 'undefined' && !window.cardano?.lace) {
        
setShowWalletPopup((prev) => {
  console.log("sdvsdvsd", prev);
  return !prev;
});
        return;
      }
      await handleConnect();
    } catch (err) {
      console.error("Wallet error:", err);
    } finally {
      setIsCheckingWallet(false);
    }
  };


  const handleConnect = async () => {
    try {
      await connect("lace");
      console.log("Wallet connected successfully");
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  useEffect(() => {
    async function fetchAddresses() {
      if (wallet) {
        try {
          const used = await wallet.getUsedAddresses();
          const walletAddress = used[0];
          const userId = sessionStorage.getItem("userId");

          const response = await fetch("/api/auth/wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, walletAddress }),
          });

          if (!response.ok) {
            const errorData = await response.json(); // 🔥 Parse JSON error message

            console.warn("Server responded with error:", response.status, errorData);
            await handleDisconnect();

            toast.error("Validation Error", {
              description: errorData.message || "Wallet validation failed.",
              duration: 6000,
            });
          }

        } catch (err) {
          console.warn("Error fetching addresses or sending request:", err);
          await handleDisconnect();
        }
      }
    }

    fetchAddresses();
  }, [wallet]);


  const handleDisconnect = async () => {
    try {
      await disconnect();
      if (currentView !== "designer") {
        onBack();
      }
      console.log("Wallet disconnected successfully");
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
    }
  };

  const userProfile = {
    name: sessionStorage.getItem("orgName"),
    email: sessionStorage.getItem("email"),
  };

  const handleMouseMove = useCallback(
    (
      e: MouseEvent,
      setter: (pos: MousePosition) => void,
      ref: React.RefObject<HTMLElement>
    ) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setter({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    []
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
          .animate-fade-in,
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

      <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-b border-white/20 text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-light tracking-wide relative">
                Certara
                <span
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    bottom: 7,
                    left: "100%",
                    marginLeft: "2px",
                    animation: "subtlePulse 6s ease-in-out infinite",
                  }}
                />
              </span>
            </div>

            {/* Wallet + Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  ref={walletRef}
                  onClick={handleWalletAction}
                  disabled={isCheckingWallet}
                  onMouseMove={(e) =>
                    handleMouseMove(
                      e.nativeEvent,
                      setWalletMousePosition,
                      walletRef
                    )
                  }
                  onMouseEnter={() => setIsWalletHovering(true)}
                  onMouseLeave={() => setIsWalletHovering(false)}
                  className={`relative overflow-hidden flex items-center px-4 px-2 rounded-lg font-semibold text-sm smooth-transition hover-lift border min-h-[48px] ${connected
                      ? "bg-black/80 hover:bg-black/90 border-white/20 hover:border-white/40 text-white"
                      : "bg-black/80 hover:bg-black/90 border-white/20 hover:border-white/40 text-white"
                    } ${isCheckingWallet ? "opacity-70 cursor-not-allowed" : ""}`}>
                  {isWalletHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(walletMousePosition, isWalletHovering)}
                      aria-hidden="true"
                    />
                  )}
                  <Wallet className="w-5 h-5 mr-3 relative z-10" />
                  <span className="relative z-10">
                    {isCheckingWallet ? "Connecting..." : connected ? "Disconnect" : "Connect Wallet"}
                  </span>
                </button>

                {showWalletPopup && (
                  <div
                    ref={popupRef}
                    className="absolute right-0 mt-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-[1000] animate-fade-in"
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-white">
                            Lace Wallet Required
                          </h3>
                          <div className="mt-1 text-sm text-white/80">
                            <p>
                              To connect your wallet, please install the Lace
                              browser extension.
                            </p>
                          </div>
                          <div className="mt-4">
                            <a
                              href="https://www.lace.io/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white text-black smooth-transition hover-lift"
                            >
                              Get Lace Wallet
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                            <button
                              type="button"
                              onClick={() => setShowWalletPopup(false)}
                              className="ml-2 inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white smooth-transition hover-lift"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  ref={profileRef}
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  onMouseMove={(e) =>
                    handleMouseMove(
                      e.nativeEvent,
                      setProfileMousePosition,
                      profileRef
                    )
                  }
                  onMouseEnter={() => setIsProfileHovering(true)}
                  onMouseLeave={() => setIsProfileHovering(false)}
                  className="relative overflow-hidden flex items-center justify-center p-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover-lift border border-white/20 hover:border-white/40"
                >
                  {isProfileHovering && (
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none smooth-transition"
                      style={getGlassStyle(
                        profileMousePosition,
                        isProfileHovering
                      )}
                      aria-hidden="true"
                    />
                  )}
                  {base64Image ? (
                    <img
                      src={
                        base64Image.startsWith("data:")
                          ? base64Image
                          : `data:image/png;base64,${base64Image}`
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-none block"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-[1000] animate-fade-in"
                  >
                    <div className="p-4">
                      <div className="flex items-start">

                        <div className="ml-3 w-full">
                          <h3 className="text-lg font-medium text-white">{userProfile.name}</h3>
                          <p className="text-sm text-white/80">{userProfile.email}</p>

                          <div className="mt-4 pt-4 border-t border-white/20">
                            <button
                              onClick={() => {
                                setIsProfileDropdownOpen(false);
                                sessionStorage.clear();
                                window.location.href = "/sign-in";
                              }}
                              className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 text-white smooth-transition"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
