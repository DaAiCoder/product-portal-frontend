import React, { useEffect, useState } from 'react';
import { FaGoogle, FaYahoo, FaMicrosoft, FaEnvelope, FaPlus } from 'react-icons/fa';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const EmailPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch email accounts
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/email/accounts`, { credentials: "include" });
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

  useEffect(() => {
    fetchAccounts();
    // Listen for OAuth popup completion
    const handleMessage = (event) => {
      if (event.data === 'oauth-success') {
        fetchAccounts();
        setShowModal(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
    // eslint-disable-next-line
  }, []);

  // Handles OAuth popup
  const openOAuthPopup = (provider) => {
    let loginUrl = '';
    switch (provider) {
      case 'google':
        loginUrl = `${API_BASE}/auth/google/email-connect`;
        break;
      case 'yahoo':
      case 'hotmail':
      case 'manual':
        alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon.`);
        return;
      default:
        return;
    }
    // Open OAuth in popup
    const width = 500, height = 650;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
      loginUrl,
      'oauthPopup',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  // Sidebar folders
  const FolderList = () => (
    <div className="w-full p-4 space-y-3 bg-[#f0f0f6] text-sm h-full">
      <div className="font-bold text-purple-700 cursor-pointer">📥 Inbox</div>
      <div className="text-gray-700 cursor-pointer hover:text-purple-600">📤 Sent</div>
      <div className="text-gray-700 cursor-pointer hover:text-purple-600">📝 Drafts</div>
      <div className="text-gray-700 cursor-pointer hover:text-purple-600">🗑️ Trash</div>
      <div className="text-gray-700 cursor-pointer hover:text-purple-600">📂 Spam</div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <FaPlus /> Add Account
      </button>
    </div>
  );

  // Multi-provider modal
  const AccountPopup = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Select Email Provider</h2>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <button
            onClick={() => openOAuthPopup('google')}
            className="flex items-center justify-center gap-2 p-3 border rounded-lg shadow-sm hover:bg-gray-100 text-red-500"
          >
            <FaGoogle /> Gmail
          </button>
          <button
            onClick={() => openOAuthPopup('yahoo')}
            className="flex items-center justify-center gap-2 p-3 border rounded-lg shadow-sm hover:bg-gray-100 text-purple-600"
          >
            <FaYahoo /> Yahoo
          </button>
          <button
            onClick={() => openOAuthPopup('hotmail')}
            className="flex items-center justify-center gap-2 p-3 border rounded-lg shadow-sm hover:bg-gray-100 text-blue-600"
          >
            <FaMicrosoft /> Outlook/Hotmail
          </button>
          <button
            onClick={() => openOAuthPopup('manual')}
            className="flex items-center justify-center gap-2 p-3 border rounded-lg shadow-sm hover:bg-gray-100 text-gray-600"
          >
            <FaEnvelope /> Other/Manual
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

  // Main layout
  return (
    <div className="flex min-h-screen bg-[#f8f9fb] text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white shadow-md flex flex-col">
        <div className="py-6 text-center text-2xl font-black text-purple-700 tracking-wide">
          Mailbox
        </div>
        <FolderList />
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Connected Accounts</h2>
          {accounts.length === 0 ? (
            <div className="text-gray-500 bg-white rounded-xl shadow px-6 py-8 text-center">
              No email accounts connected yet.
              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                >
                  Add Account
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-2">
              {accounts.map((account, i) => (
                <li key={i} className="bg-white rounded-lg shadow p-4 flex items-center gap-2 text-gray-800">
                  <FaEnvelope className="text-blue-400" /> {typeof account === 'string' ? account : account.email || 'Unknown'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      {showModal && <AccountPopup />}
    </div>
  );
};

export default EmailPage;
