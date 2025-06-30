'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import ActionButtons from '@/components/ActionButtons';
import InfoCards from '@/components/InfoCards';
import TemplateDesigner from '@/components/TemplateDesigner';
import CreateCertificate from '@/components/CreateCertificate'; // your new component

export default function HomePage() {
  const [view, setView] = useState<'home' | 'designer' | 'certificate'>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {view === 'home' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CertApp</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create, manage, and verify blockchain-based certificates with ease.
            </p>
          </div>

          <ActionButtons
            onCreateTemplate={() => setView('designer')}
            onCreateCertificate={() => setView('certificate')}
          />

          <div className="mt-16">
            <InfoCards />
          </div>
        </main>
      )}

      {view === 'designer' && <TemplateDesigner />}
      {view === 'certificate' && <CreateCertificate />}
    </div>
  );
}
