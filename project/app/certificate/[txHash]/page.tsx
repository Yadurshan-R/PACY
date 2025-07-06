'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';

type Certificate = {
  name: string;
  description: string;
  degree: string,
  issued: string,
};

export default function CertificatePage({ params }: { params: Promise<{ txHash: string }> }) {
  const { txHash } = use(params);

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'app' | 'cardanoscan'>('app');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab !== 'app') return;

    async function fetchTxMetadata() {
      setLoading(true);
      try {
        const res = await fetch(`/api/metadata/${txHash}`);
        const { certificate, error } = await res.json();

        if (!res.ok || error) {
          throw new Error(error || 'Unknown error fetching certificate');
        }

        setCertificate(certificate);
        setError(null);
      } catch (err: any) {
        setError('Failed to fetch minted assets: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTxMetadata();
  }, [txHash, tab]);

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

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-light text-white flex items-center gap-2 animate-stagger-1">
              <div className="w-8 h-8 bg-emerald-600/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                <span className="text-white text-sm">🎓</span>
              </div>
              Certificate Viewer
            </h1>
            <p className="text-sm text-white/70 mt-1 animate-stagger-2">Transaction: {txHash}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 mb-8 inline-flex border border-white/20 animate-stagger-1">
            <button
              onClick={() => setTab('app')}
              className={`px-6 py-3 text-sm font-medium rounded-lg smooth-transition flex items-center gap-2 ${
                tab === 'app'
                  ? 'bg-emerald-600/20 text-white hover:bg-emerald-600/30 border border-white/20 hover:border-white/40 hover-lift'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>📱</span>
              View Certificate
            </button>
            <button
              onClick={() => setTab('cardanoscan')}
              className={`px-6 py-3 text-sm font-medium rounded-lg smooth-transition flex items-center gap-2 ${
                tab === 'cardanoscan'
                  ? 'bg-emerald-600/20 text-white hover:bg-emerald-600/30 border border-white/20 hover:border-white/40 hover-lift'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🔗</span>
              View on CardanoScan
            </button>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-stagger-2">
            {tab === 'cardanoscan' ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <span className="text-2xl">🔗</span>
                </div>
                <h2 className="text-xl font-light text-white mb-3">View on CardanoScan</h2>
                <p className="text-white/70 mb-6">Explore the complete transaction metadata on CardanoScan</p>
                <a
                  href={`https://preprod.cardanoscan.io/transaction/${txHash}?tab=metadata`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-emerald-600/30 hover:border-white/40 hover-lift smooth-transition"
                >
                  Open CardanoScan
                  <span>↗</span>
                </a>
              </div>
            ) : error ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <span className="text-2xl">❌</span>
                </div>
                <h2 className="text-xl font-light text-red-400 mb-3">Error Loading Certificate</h2>
                <p className="text-white/70">{error}</p>
              </div>
            ) : loading || !certificate ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 animate-pulse">
                  <span className="text-2xl">🔄</span>
                </div>
                <h2 className="text-xl font-light text-white mb-3">Loading Certificate...</h2>
                <p className="text-white/70">Fetching metadata from the blockchain</p>
                <div className="mt-6 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                {/* Certificate Header */}
                <div className="text-center mb-8 pb-6 border-b border-white/20">
                  <div className="w-20 h-20 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h1 className="text-3xl font-light text-white mb-2">{certificate.name}</h1>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">{certificate.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Certificate Details */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-light text-white flex items-center gap-2">
                      <span className="w-6 h-6 bg-emerald-600/20 backdrop-blur-sm rounded flex items-center justify-center text-sm border border-white/20">📋</span>
                      Certificate Details
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <label className="text-sm font-medium text-white/70 uppercase tracking-wide">Course Name</label>
                        <p className="text-lg font-light text-white mt-1">{certificate.degree}</p>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <label className="text-sm font-medium text-white/70 uppercase tracking-wide">Issue Date</label>
                        <p className="text-lg font-light text-white mt-1">{certificate.issued}</p>
                      </div>
                      
                      <div className="bg-emerald-600/20 backdrop-blur-sm rounded-lg p-4 border border-emerald-400/30">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </span>
                          <label className="text-sm font-medium text-emerald-200 uppercase tracking-wide">Verification Status</label>
                        </div>
                        <p className="text-emerald-100 font-light">Verified on Cardano Blockchain</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}