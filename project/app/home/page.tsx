'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ActionButtons from '@/components/ActionButtons';
import InfoCards from '@/components/InfoCards';
import TemplateDesigner from '@/components/TemplateDesigner';
import CreateCertificate from '@/components/CreateCertificate';

export default function HomePage() {
  const [view, setView] = useState<'home' | 'designer' | 'certificate'>('home');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showWalletPrompt, setShowWalletPrompt] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      localStorage.clear();
      router.push('/');
    }
  }, [router]);

  const handleBackToHome = () => {
    setView('home');
  };

  const handleWalletStatusChange = (connected: boolean) => {
    setIsWalletConnected(connected);
  };

  const handleCreateCertificate = () => {
    if (!isWalletConnected) {
      setShowWalletPrompt(true);
      return;
    }
    setView('certificate');
  };

  return (
    <>
      <style jsx>{`
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }
        }
        @keyframes subtlePulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 1; 
          }
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
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
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
        .animate-stagger-3 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }
        .animate-stagger-4 {
          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }
        .hover-lift:hover {
          transform: translateY(-1px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .smooth-transition {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-background {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-stagger-1,
          .animate-stagger-2,
          .animate-stagger-3,
          .animate-stagger-4 {
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
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-16">
        <Header  
          onWalletStatusChange={handleWalletStatusChange}
          walletAddress={walletAddress}
          onBack={handleBackToHome}
          currentView={view}
        />

        {view === 'home' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="mb-12 animate-stagger-1">
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-normal"
                style={{
                  animation: "textGlow 6s ease-in-out infinite",
                }}
              >
                Welcome to Certara
                <span
                  className="inline-block w-1 h-1 bg-white rounded-full ml-1"
                  style={{
                    animation: "subtlePulse 4s ease-in-out infinite",
                  }}
                  aria-hidden="true"
                />
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Create, manage, and verify blockchain-based certificates with ease.
              </p>
            </div>

            <div className="animate-stagger-2">
              <ActionButtons
                onCreateTemplate={() => setView('designer')}
                onCreateCertificate={handleCreateCertificate}
              />
            </div>

            {showWalletPrompt && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
                <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md mx-4">
                  <h3 className="text-xl font-medium mb-4 text-white">Wallet Required</h3>
                  <p className="text-white/70 mb-6">
                    You need to connect your wallet to create certificates. 
                    Please connect your wallet first.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => setShowWalletPrompt(false)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white smooth-transition hover-lift"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowWalletPrompt(false);
                        // You might want to automatically open the wallet connect popup here
                      }}
                      className="px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-white/20 hover:border-white/40 text-white smooth-transition hover-lift"
                    >
                      Connect Wallet
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-16 animate-stagger-3">
              <InfoCards />
            </div>
          </main>
        )}

        {view === 'designer' && <TemplateDesigner onBack={handleBackToHome} />}
        {view === 'certificate' && <CreateCertificate onBack={handleBackToHome} />}
      </div>
    </>
  );
}