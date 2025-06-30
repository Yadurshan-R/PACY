import React from 'react';

interface Props {
  user: { name: string; email: string };
  onClose: () => void;
}

export default function ProfileDropdown({ user, onClose }: Props) {
  const handleSignOut = () => {
    console.log('Signing out...');
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <div className="px-4 py-2 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button onClick={onClose} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        View Profile
      </button>
      <button onClick={onClose} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Change Password
      </button>
      <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Sign Out
      </button>
    </div>
  );
}
