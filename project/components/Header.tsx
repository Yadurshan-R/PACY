'use client';

import { useState } from 'react';
import { ChevronDown, Wallet, Award, User } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const userProfile = { name: 'John Doe', email: 'john@example.com' };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xl font-bold">PACY</span>
          </div>

          {/* Wallet + Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsWalletConnected(!isWalletConnected)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isWalletConnected
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-500 hover:bg-blue-400 border border-blue-400'
              }`}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isWalletConnected ? 'Wallet Connected' : 'Connect to Wallet'}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center p-2 rounded-full hover:bg-blue-500 transition"
              >
                <User className="w-6 h-6" />
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {isProfileDropdownOpen && (
                <ProfileDropdown
                  user={userProfile}
                  onClose={() => setIsProfileDropdownOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
