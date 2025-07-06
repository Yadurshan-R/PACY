"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Clock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

type Certificate = {
  nic: string;
  name: string;
  degree: string;
  issued: string;
  description: string;
};

type User = {
  orgName: string;
  email: string;
  location: string;
  logo: string; // base64 image string
};

type Metadata = {
  certificate: Certificate;
  address: string;
  user: User;
};

interface CertificateViewPageProps {
  params: {
    txHash: string;
  };
}

export default function CertificateViewPage({ params }: CertificateViewPageProps) {
  const [data, setData] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { txHash } = params;

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const res = await fetch(`/api/metadata/${txHash}`);
        if (!res.ok) throw new Error("Failed to fetch metadata");
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMetadata();
  }, [txHash]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg text-white/70">Loading certificate...</p>
      </div>
    );

  if (error || !data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 text-center">
        <p className="text-lg text-red-400">
          {error || "Certificate data not found."}
        </p>
      </div>
    );

  const { certificate, user, address } = data;

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        
        .designer-heading {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 300;
          letter-spacing: -0.02em;
        }
        
        .designer-text {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 300;
          letter-spacing: -0.01em;
        }
        
        .designer-indicators {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }
        }
        @keyframes subtlePulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scale(1.2); 
            opacity: 1; 
          }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInScale {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-6xl mx-auto px-8 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <h1
              className="designer-heading text-3xl sm:text-5xl md:text-6xl leading-[0.9] mb-8 tracking-tight text-center"
              style={{ animation: "textGlow 18s ease-in-out infinite" }}
            >
              Certificate Details
              <span
                className="inline-block w-1.5 h-1.5 bg-white rounded-full ml-2"
                style={{ animation: "subtlePulse 6s ease-in-out infinite" }}
              />
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="designer-indicators flex justify-center items-center gap-10 text-white/40 text-sm uppercase mb-12"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4" />
                <span>Immutable</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>Verified</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span>Blockchain Secured</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative rounded-3xl p-8 sm:p-16 border border-white/25 backdrop-blur-sm transition-all duration-400 hover:border-white/50 overflow-hidden bg-white/8 hover:bg-white/12 shadow-2xl max-w-4xl mx-auto"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <motion.div className="text-left" style={{ animation: "slideInFromLeft 1s ease-out 0.5s both" }}>
                  <div className="designer-text text-white/40 text-sm font-medium tracking-wider uppercase">
                    Certara
                  </div>
                  <div className="w-12 h-px bg-white/30 mt-1" />
                </motion.div>
                <motion.div className="text-right" style={{ animation: "slideInFromRight 1s ease-out 0.5s both" }}>
                  <div className="designer-text text-white/40 text-sm font-medium tracking-wider uppercase">
                    Blockchain Verified
                  </div>
                  <div className="w-12 h-px bg-white/30 mt-1 ml-auto" />
                </motion.div>
              </div>

              <div className="text-center space-y-8">
                {/* Organization Logo */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {user.logo && (
                    <img
                      src={user.logo}
                      alt={`${user.orgName} logo`}
                      className="h-20 w-20 rounded-full border border-white/20 object-cover"
                    />
                  )}
                </motion.div>

                <motion.h3
                  className="designer-heading text-3xl font-light text-white/90 tracking-wide"
                  style={{ animation: "fadeInScale 1s ease-out 0.8s both" }}
                >
                  CERTIFICATE OF AUTHENTICITY
                </motion.h3>

                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />

                  <motion.div
                    className="designer-text text-white/70 font-light leading-relaxed space-y-3"
                    style={{ animation: "fadeInScale 1s ease-out 1s both" }}
                  >
                    <p className="text-lg">This certifies that</p>
                    <p className="designer-heading text-2xl font-medium text-white/90">
                      {certificate.name}
                    </p>
                    <p>has successfully completed</p>
                    <p className="designer-heading text-xl font-medium text-white/90">
                      {certificate.degree}
                    </p>
                    <p className="text-sm text-white/60">{certificate.description}</p>
                  </motion.div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                </div>

                <motion.div
                  className="grid grid-cols-2 gap-8 max-w-2xl mx-auto"
                  style={{ animation: "fadeInScale 1s ease-out 1.2s both" }}
                >
                  <div className="text-left">
                    <div className="designer-text text-white/40 text-xs font-medium tracking-wider mb-2 uppercase">
                      Issued To
                    </div>
                    <div className="designer-heading text-white/80 text-lg font-medium">{certificate.name}</div>
                    <div className="designer-text text-white/50 text-sm">NIC: {certificate.nic}</div>
                  </div>
                  <div className="text-right">
                    <div className="designer-text text-white/40 text-xs font-medium tracking-wider mb-2 uppercase">
                      Issued By
                    </div>
                    <div className="designer-heading text-white/80 text-lg font-medium">{user.orgName}</div>
                    <div className="designer-text text-white/50 text-sm">{user.location}</div>
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center border-t border-white/20 pt-6"
                  style={{ animation: "fadeInScale 1s ease-out 1.4s both" }}
                >
                  <div>
                    <div className="designer-text text-white/40 text-xs font-medium tracking-wider uppercase">
                      Hash
                    </div>
                    <div className="designer-text text-white/70 text-sm font-mono mt-1 truncate">
                      {txHash.slice(0, 6)}...{txHash.slice(-4)}
                    </div>
                  </div>
                  <div>
                    <div className="designer-text text-white/40 text-xs font-medium tracking-wider uppercase">
                      Date Issued
                    </div>
                    <div className="designer-text text-white/70 text-sm mt-1">
                      {certificate.issued}
                    </div>
                  </div>
                  <div>
                    <div className="designer-text text-white/40 text-xs font-medium tracking-wider uppercase">
                      Status
                    </div>
                    <div className="designer-text text-white/60 text-sm mt-1 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Verified
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -skew-x-12 -translate-x-full"
              style={{ animation: "shimmer 4s ease-in-out infinite 1s" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <Link href="/">
              <button
                className="designer-text bg-transparent border border-white/20 hover:bg-white/8 hover:border-white/40 text-white hover:text-white transition-all duration-300 rounded-xl h-12 px-8 text-base font-medium focus:ring-2 focus:ring-white/20 focus:ring-offset-0 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">Back to Home</span>
              </button>
            </Link>

            <a
              href={`https://preprod.cardanoscan.io/transaction/${txHash}?tab=metadata`}
              target="_blank"
              rel="noopener noreferrer"
              className="designer-text relative overflow-hidden bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-xl h-12 px-8 text-base font-medium group shadow-xl focus:ring-2 focus:ring-white/20 focus:ring-offset-0 flex items-center gap-2"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ animation: "shimmer 3s ease-in-out infinite 2s" }}
              />
              <span className="relative z-10">View on CardanoScan</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-20 mb-10"
          >
            <a
              href="mailto:contact@certara.com"
              className="designer-text text-white/70 hover:text-white transition-colors duration-300 text-lg"
            >
              contact@certara.com
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}