import React, { useEffect, useState } from 'react';
import { FaGoogle, FaYahoo, FaMicrosoft, FaEnvelope, FaPlus } from 'react-icons/fa';
import '../styles/globals.css';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://product-portal-backend-xo2c.onrender.com';

const EmailPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState([]);

  // Handle OAuth popup response using postMessage
  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === 'email_connected') {
        setShowModal(false);
        fetchAccounts();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Fetch accounts with credentials (sends cookies/session)
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/email/accounts`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      } else {
        setAccounts([]);
      }
    } catch (err) {
      setAccounts([]);
    }
  };

  // Open OAuth popup and handle window closing
  const openOAuthPopup = (provider) => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    let loginUrl = '';
    switch (provider) {
      case 'google':
        loginUrl = `${API_BASE_URL}/auth/google/email-connect`;
        break;
      case 'yahoo':
        alert('Yahoo login coming soon.');
        return;
      case 'hotmail':
        alert('Hotmail login coming soon.');
        return;
      case 'manual':
        alert('Manual setup not yet implemented.');
        return;
      default:
        return;
    }
    const popup = window.open(
      loginUrl,
      'OAuthLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Folder sidebar
  const FolderList = () => (
    <div className="w-full p-4 space-y-3 bg-[#f0f0f6] text-sm min-h-screen">
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
  );

  // Popup modal for account provider selection
  const AccountPopup = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Select Email Provider</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => openOAuthPopup('google')}
            className="flex items-center gap-2 p-3 border rounded hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500" /> Gmail
          </button>
          <button
            onClick={() => openOAuthPopup('yahoo')}
            className="flex items-center gap-2 p-3 border rounded hover:bg-gray-100"
          >
            <FaYahoo className="text-purple-600" /> Yahoo
          </button>
          <button
            onClick={() => openOAuthPopup('hotmail')}
            className="flex items-center gap-2 p-3 border rounded hover:bg-gray-100"
          >
            <FaMicrosoft className="text-blue-600" /> Hotmail
          </button>
          <button
            onClick={() => openOAuthPopup('manual')}
            className="flex items-center gap-2 p-3 border rounded hover:bg-gray-100"
          >
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
  );

  return (
    <div className="flex h-screen bg-[#fff] text-gray-800">
      <div className="w-64 border-r shadow-sm">
        <FolderList />
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
        {!Array.isArray(accounts) || accounts.length === 0 ? (
          <p className="text-gray-500">No email accounts connected.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {accounts.map((account, i) => (
              <li key={i} className="text-sm text-gray-700">
                {typeof account === 'string' ? account : account.email || 'Unknown'}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showModal && <AccountPopup />}
    </div>
  );
};

export default EmailPage;
