
// File: src/pages/emailpage.js
// ✨ Updated May 21 to include proper Gmail login URL and preserve all pre-existing logic

import React, { useState } from 'react';
import { FaInbox, FaPaperPlane, FaFileAlt, FaTrash, FaGoogle, FaYahoo, FaEnvelope } from 'react-icons/fa';
import EmailWidget from '@/components/widgets/EmailWidget';

const EmailPage = () => {
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [showAddAccountPopup, setShowAddAccountPopup] = useState(false);

  const folders = [
    { name: 'Inbox', icon: <FaInbox /> },
    { name: 'Sent', icon: <FaPaperPlane /> },
    { name: 'Drafts', icon: <FaFileAlt /> },
    { name: 'Trash', icon: <FaTrash /> }
  ];

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const top = window.innerHeight / 2 - height / 2;
    const left = window.innerWidth / 2 - width / 2;

    window.open(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/auth/google/login`,
      'GoogleLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r p-4">
        <div className="text-xl font-bold mb-6">📧 My Mail</div>
        {folders.map(folder => (
          <div
            key={folder.name}
            className={`flex items-center mb-3 p-2 rounded cursor-pointer hover:bg-gray-200 ${
              activeFolder === folder.name ? 'bg-gray-300 font-semibold' : ''
            }`}
            onClick={() => setActiveFolder(folder.name)}
          >
            <span className="mr-2">{folder.icon}</span>
            {folder.name}
          </div>
        ))}
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAddAccountPopup(true)}
        >
          ➕ Add Account
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4">{activeFolder}</h2>
        <EmailWidget folder={activeFolder} />
      </div>

      {/* Add Account Modal */}
      {showAddAccountPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6">
            <div className="text-xl font-bold mb-4">Add Email Account</div>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 mb-3 rounded"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
            <button className="flex items-center w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 mb-3 rounded">
              <FaYahoo className="mr-2" /> Sign in with Yahoo (Coming Soon)
            </button>
            <button className="flex items-center w-full bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
              <FaEnvelope className="mr-2" /> Add Other Email (Coming Soon)
            </button>
            <button
              onClick={() => setShowAddAccountPopup(false)}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailPage;
