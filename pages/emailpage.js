// src/pages/emailpage.js
import React, { useEffect, useState, useRef } from 'react';
import {
  FaGoogle,
  FaYahoo,
  FaMicrosoft,
  FaPlus,
  FaEnvelope,
  FaRobot
} from 'react-icons/fa';
import AiPromptModal from '../components/AiPromptModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://product-portal-backend-xo2c.onrender.com';

const EmailPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts]   = useState([]);
  const [aiOpen, setAiOpen]       = useState(false);
  const popupRef                  = useRef(null);

  // Fetch email accounts
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/email/accounts`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Not authenticated');
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      setAccounts([]);
    }
  };

  // OAuth popup
  const openOAuthPopup = provider => {
    const width  = 500;
    const height = 600;
    const left   = window.screenX + (window.outerWidth - width) / 2;
    const top    = window.screenY + (window.outerHeight - height) / 2;
    let loginUrl = '';

    switch (provider) {
      case 'google':
        loginUrl = `${API_BASE_URL}/auth/google/email-connect`;
        break;
      default:
        alert('Provider coming soon.');
        return;
    }

    popupRef.current = window.open(
      loginUrl,
      'OAuthLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );
    const iv = setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        clearInterval(iv);
        setShowModal(false);
        fetchAccounts();
      }
    }, 700);
  };

  useEffect(fetchAccounts, []);

  return (
    <div className="flex h-screen bg-[#fff] text-gray-800">
      <div className="w-64 border-r shadow-sm">
        {/* Sidebar/folders */}
        <div className="w-full p-4 space-y-3 bg-[#f0f0f6] text-sm">
          <div className="font-bold text-purple-700">📥 Inbox</div>
          <div className="text-gray-700">📤 Sent</div>
          <div className="text-gray-700">📝 Drafts</div>
          <div className="text-gray-700">🗑️ Trash</div>
          <div className="text-gray-700">📂 Spam</div>
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
          >
            <FaPlus /> Add Account
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header with AI button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Connected Accounts</h2>
          <button
            onClick={() => setAiOpen(true)}
            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            <FaRobot /><span>AI</span>
          </button>
        </div>

        <AiPromptModal
          isOpen={aiOpen}
          onClose={() => setAiOpen(false)}
          defaultPrompt="Summarize the last 3 emails I received."
          context={{ emails: accounts.slice(-3) }}
        />

        {!Array.isArray(accounts) || accounts.length === 0 ? (
          <p className="text-gray-500">No email accounts connected.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {accounts.map((acct, i) => (
              <li key={i}>{typeof acct === 'string' ? acct : acct.email}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Account Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Select Email Provider</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => openOAuthPopup('google')}
                className="flex items-center gap-2 p-3 border rounded hover:bg-gray-100"
              >
                <FaGoogle className="text-red-500" /> Gmail
              </button>
              <button disabled className="flex items-center gap-2 p-3 border rounded opacity-50">
                <FaYahoo className="text-purple-600" /> Yahoo
              </button>
              <button disabled className="flex items-center gap-2 p-3 border rounded opacity-50">
                <FaMicrosoft className="text-blue-600" /> Outlook
              </button>
              <button disabled className="flex items-center gap-2 p-3 border rounded opacity-50">
                <FaEnvelope /> Other
              </button>
            </div>
            <button
              className="mt-6 w-full text-center text-blue-600 hover:text-blue-800 text-sm"
              onClick={() => setShowModal(false)}
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



