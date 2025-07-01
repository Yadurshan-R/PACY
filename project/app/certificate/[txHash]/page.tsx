'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';

type Certificate = {
  name: string;
  description: string;
  extra: {
    course: string;
    issued: string;
  };
  image: string;
  mediaType: string;
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
        const res = await fetch(
          `https://cardano-preprod.blockfrost.io/api/v0/txs/${txHash}/metadata`,
          {
            headers: {
              project_id: process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID!,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Blockfrost API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        const metadata721 = data.find((item: any) => item.label === '721');
        if (!metadata721) {
          setError('No CIP-721 metadata found.');
          return;
        }

        const jsonMetadata = metadata721.json_metadata;
        const policyIds = Object.keys(jsonMetadata);
        if (policyIds.length === 0) {
          setError('No policy IDs found in metadata.');
          return;
        }

        const policyId = policyIds[0];
        const assets = jsonMetadata[policyId];
        const assetNames = Object.keys(assets);
        if (assetNames.length === 0) {
          setError('No assets found in metadata.');
          return;
        }

        const assetName = assetNames[0];
        const certData: Certificate = assets[assetName];

        setCertificate(certData);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎓</span>
            </div>
            Certificate Viewer
          </h1>
          <p className="text-sm text-gray-600 mt-1">Transaction: {txHash}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8 inline-flex">
          <button
            onClick={() => setTab('app')}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
              tab === 'app'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span>📱</span>
            View Certificate
          </button>
          <button
            onClick={() => setTab('cardanoscan')}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
              tab === 'cardanoscan'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span>🔗</span>
            View on CardanoScan
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          {tab === 'cardanoscan' ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔗</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">View on CardanoScan</h2>
              <p className="text-gray-600 mb-6">Explore the complete transaction metadata on CardanoScan</p>
              <a
                href={`https://preprod.cardanoscan.io/transaction/${txHash}?tab=metadata`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Open CardanoScan
                <span>↗</span>
              </a>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">❌</span>
              </div>
              <h2 className="text-xl font-semibold text-red-600 mb-3">Error Loading Certificate</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : loading || !certificate ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <span className="text-2xl">🔄</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Loading Certificate...</h2>
              <p className="text-gray-600">Fetching metadata from the blockchain</p>
              <div className="mt-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              {/* Certificate Header */}
              <div className="text-center mb-8 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{certificate.name}</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{certificate.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Certificate Details */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-sm">📋</span>
                    Certificate Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Course Name</label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">{certificate.extra.course}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Issue Date</label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">{certificate.extra.issued}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </span>
                        <label className="text-sm font-medium text-green-700 uppercase tracking-wide">Verification Status</label>
                      </div>
                      <p className="text-green-800 font-medium">Verified on Cardano Blockchain</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Image */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center text-sm">🖼️</span>
                    Certificate Image
                  </h2>
                  
                  {certificate.image && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <img
                        className="w-full h-auto rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                        src={certificate.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                        alt="Certificate"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNzIuMDkxIDIyMi4wOTEgMTkwIDI1MCAyMDBWMjAwQzI3Ny45MDkgMjAwIDMwMCAxNzcuOTA5IDMwMCAxNTBWMTUwQzMwMCAxMjIuMDkxIDI3Ny45MDkgMTAwIDI1MCAxMDBWMTAwQzIyMi4wOTEgMTAwIDIwMCAxMjIuMDkxIDIwMCAxNTBWMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3Mjc5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}