
// ✅ emailpage.js — Yahoo-style UI with folders + Add Account modal (Google login linked)
import React, { useEffect, useState } from 'react';
import EmailWidget from '../components/widgets/EmailWidget';
import { FaInbox, FaPaperPlane, FaRegFileAlt, FaTrash, FaBug, FaPlus, FaGoogle, FaYahoo, FaMicrosoft } from 'react-icons/fa';

const EmailPage = () => {
  const [showModal, setShowModal] = useState(false);

  const openPopup = (provider) => {
    if (provider === 'google') {
      const width = 600;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      window.open(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/auth/google/login`,
        'GoogleLogin',
        `width=${width},height=${height},top=${top},left=${left}`
      );
    }
    // Add logic for other providers later (Yahoo, Outlook, etc.)
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar folders */}
      <aside className="w-60 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-4">Folders</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2"><FaInbox /> Inbox</li>
          <li className="flex items-center gap-2"><FaPaperPlane /> Sent</li>
          <li className="flex items-center gap-2"><FaRegFileAlt /> Drafts</li>
          <li className="flex items-center gap-2"><FaTrash /> Trash</li>
          <li className="flex items-center gap-2"><FaBug /> Spam</li>
        </ul>
        <button onClick={() => setShowModal(true)} className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          <FaPlus /> Add Account
        </button>
      </aside>

      {/* Email Panel */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Email Accounts</h1>
        <EmailWidget />
      </main>

      {/* Add Account Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-4 text-xl font-bold text-gray-500 hover:text-black">&times;</button>
            <h2 className="text-xl font-semibold mb-4">Add Email Account</h2>
            <div className="space-y-4">
              <button onClick={() => openPopup('google')} className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                <FaGoogle /> Sign in with Google
              </button>
              <button className="w-full flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                <FaYahoo /> Sign in with Yahoo
              </button>
              <button className="w-full flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
                <FaMicrosoft /> Sign in with Outlook
              </button>
              <button className="w-full flex items-center gap-3 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded">
                Other / Manual Setup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailPage;
