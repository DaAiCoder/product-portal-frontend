import React, { useEffect, useState } from 'react';
import { FaGoogle, FaYahoo, FaMicrosoft, FaPlus } from 'react-icons/fa';
import '../styles/globals.css';

const EmailPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const res = await fetch('/api/email/accounts');
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error('Failed to fetch email accounts:', err);
    }
  };

  const openOAuthPopup = (provider) => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    let loginUrl = '';
    switch (provider) {
      case 'google':
        loginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/auth/google/login`;
        break;
      case 'yahoo':
        alert('Yahoo login coming soon.');
        return;
      case 'hotmail':
        alert('Hotmail login coming soon.');
        return;
      default:
        return;
    }

    window.open(loginUrl, 'OAuthLogin', `width=${width},height=${height},top=${top},left=${left}`);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const FolderList = () => (
    <div className="folder-list">
      <div className="folder">📥 Inbox</div>
      <div className="folder">📤 Sent</div>
      <div className="folder">📝 Drafts</div>
      <div className="folder">🗑️ Trash</div>
      <div className="folder">📂 Spam</div>
      <div className="folder add-account" onClick={() => setShowModal(true)}>
        <FaPlus /> Add Account
      </div>
    </div>
  );

  const AccountPopup = () => (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select Email Provider</h2>
        <div className="provider-buttons">
          <button onClick={() => openOAuthPopup('google')}>
            <FaGoogle /> Sign in with Google
          </button>
          <button onClick={() => openOAuthPopup('yahoo')}>
            <FaYahoo /> Sign in with Yahoo
          </button>
          <button onClick={() => openOAuthPopup('hotmail')}>
            <FaMicrosoft /> Sign in with Hotmail
          </button>
        </div>
        <button className="close-btn" onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="email-page-container">
      <div className="email-sidebar">
        <FolderList />
      </div>
      <div className="email-main-content">
        <h2 className="text-lg font-semibold mb-3">Connected Accounts</h2>
        {accounts.length === 0 ? (
          <p className="text-gray-600">No email accounts connected.</p>
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
