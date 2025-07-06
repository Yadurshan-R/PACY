"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { ChevronDown, Wallet, Award, User, ExternalLink } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useWallet } from "@meshsdk/react";

interface MousePosition {
  x: number;
  y: number;
}

interface HeaderProps {
  onWalletStatusChange?: (isConnected: boolean) => void;
  walletAddress?: string | null;
  onBack: () => void;
  currentView?: "home" | "designer" | "certificate"; // Add this
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

  // Close popups when clicking outside
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

  // Close dropdown when popup opens and vice versa
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
      // Try to detect Lace wallet
      if (typeof window !== "undefined" && !window.cardano?.lace) {
        setShowWalletPopup(true);
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
      // const walletAddresses = await wallet.getUsedAddresses();
      // const walletAddress = walletAddresses.length > 0 ? walletAddresses[0] : null;
      // const userId = localStorage.getItem("userId");
      // console.log("Vsdvsvsdv",walletAddress);
      // await fetch("/api/auth/wallet", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ userId, walletAddress }),
      //   });

      console.log("Wallet connected successfully");
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

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
          radial-gradient(ellipse 80px 50px at ${mousePos.x}px ${mousePos.y}px, 
            rgba(255,255,255,0.15) 0%, 
            rgba(255,255,255,0.08) 30%, 
            rgba(255,255,255,0.03) 50%,
            transparent 70%),
          radial-gradient(ellipse 40px 25px at ${mousePos.x - 10}px ${
          mousePos.y - 8
        }px, 
            rgba(255,255,255,0.2) 0%, 
            rgba(255,255,255,0.1) 40%, 
            transparent 70%)
        `,
        filter: "blur(0.5px) contrast(1.1)",
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
          transform: translateY(-1px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 text-white shadow-2xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 border border-white/20">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-light tracking-wide">PACY</span>
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
                  className={`relative overflow-hidden flex items-center px-4 py-2 rounded-lg font-medium smooth-transition hover-lift border ${
                    connected
                      ? "bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/30 text-emerald-200"
                      : "bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm"
                  } ${isCheckingWallet ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isWalletHovering && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none smooth-transition"
                      style={getGlassStyle(
                        walletMousePosition,
                        isWalletHovering
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <Wallet className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">
                    {isCheckingWallet
                      ? "Checking..."
                      : connected
                      ? "Disconnect"
                      : "Connect Wallet"}
                  </span>
                </button>

                {/* Wallet Install Popup */}
                {showWalletPopup && (
                  <div
                    ref={popupRef}
                    className="absolute right-0 mt-2 w-72 bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl z-[1000] animate-fade-in"
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <Wallet className="w-5 h-5 text-emerald-400" />
                        </div>
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
                              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600/30 border border-emerald-400/30"
                            >
                              Get Lace Wallet
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                            <button
                              type="button"
                              onClick={() => setShowWalletPopup(false)}
                              className="ml-2 inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white/10 text-white hover:bg-white/20 border border-white/20"
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
                  className="relative overflow-hidden flex items-center p-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover-lift border border-white/20 backdrop-blur-sm"
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
                              className="w-8 h-8 rounded-full object-cover "
                            />
                          ) : (
                            <User className="w-8 h-8 text-emerald-400" />
                          )}
                </button>

                {/* Profile Dropdown - matching popup style */}
                {isProfileDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl z-[1000] animate-fade-in"
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        
                        <div className="ml-3 w-full">
                          <h3 className="text-lg font-medium text-white">
                            {userProfile.name}
                          </h3>
                          <p className="text-sm text-white/80">
                            {userProfile.email}
                          </p>

                          <div className="mt-4 pt-4 border-t border-white/10">
                            <button
                              onClick={() => {
                                // Add your sign out logic here
                                setIsProfileDropdownOpen(false);
                                localStorage.clear();
                              }}
                              className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 text-white"
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
