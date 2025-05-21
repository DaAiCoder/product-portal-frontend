// components/pages/emailpage.js
import React, { useState, useEffect } from 'react';
import { MdDelete, MdOutlineAdd, MdOutlineEmail } from 'react-icons/md';
import { FaGoogle, FaYahoo, FaHotmail, FaEnvelope } from 'react-icons/fa';
import { PiMicrosoftOutlookLogo } from 'react-icons/pi';
import EmailWidget from '../widgets/EmailWidget';

const EmailPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTab, setPopupTab] = useState('providers');

  useEffect(() => {
    fetchAccounts();
    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage);
  }, []);

  const receiveMessage = (event) => {
    if (event.data && event.data.type === 'oauth-success') {
      const { token, email } = event.data;
      localStorage.setItem('email_jwt', token);
      localStorage.setItem('user_email', email);
      fetchAccounts();
      setShowPopup(false);
    }
  };

  const fetchAccounts = async () => {
    const token = localStorage.getItem('email_jwt');
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email/accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch (err) {
      console.error(err);
    }
  };

  const removeAccount = async (accountId) => {
    const token = localStorage.getItem('email_jwt');
    if (!token) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/email/remove/${accountId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAccounts();
    } catch (err) {
      console.error(err);
    }
  };

  const triggerOAuth = (provider) => {
    const popup = window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${provider}/login`, 'oauth', 'width=500,height=600');
    const timer = setInterval(() => {
      if (popup.closed) clearInterval(timer);
    }, 500);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Email Accounts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((acc, i) => (
          <div key={i} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="flex items-center space-x-3">
              <MdOutlineEmail size={24} />
              <span>{acc.email}</span>
            </div>
            <button onClick={() => removeAccount(acc.id)} className="text-red-500 hover:text-red-700">
              <MdDelete size={20} />
            </button>
          </div>
        ))}
        <button onClick={() => setShowPopup(true)} className="border border-dashed p-4 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <MdOutlineAdd size={24} className="mr-2" />
          Add Account
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[95%] max-w-2xl max-h-[95%] overflow-auto">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Add Email Account</h2>
              <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">✕</button>
            </div>
            <div className="flex space-x-4 mb-4">
              <button onClick={() => setPopupTab('providers')} className={`px-4 py-2 rounded ${popupTab === 'providers' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Popular</button>
              <button onClick={() => setPopupTab('manual')} className={`px-4 py-2 rounded ${popupTab === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Manual</button>
            </div>

            {popupTab === 'providers' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button onClick={() => triggerOAuth('google')} className="flex items-center space-x-2 p-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                  <FaGoogle size={20} className="text-red-500" />
                  <span>Gmail</span>
                </button>
                <button disabled className="flex items-center space-x-2 p-3 border rounded opacity-50 cursor-not-allowed">
                  <FaYahoo size={20} className="text-purple-600" />
                  <span>Yahoo</span>
                </button>
                <button disabled className="flex items-center space-x-2 p-3 border rounded opacity-50 cursor-not-allowed">
                  <FaHotmail size={20} className="text-blue-600" />
                  <span>Hotmail</span>
                </button>
                <button disabled className="flex items-center space-x-2 p-3 border rounded opacity-50 cursor-not-allowed">
                  <PiMicrosoftOutlookLogo size={20} className="text-blue-500" />
                  <span>Outlook</span>
                </button>
              </div>
            )}

            {popupTab === 'manual' && (
              <EmailWidget onComplete={() => {
                setPopupTab('providers');
                setShowPopup(false);
                fetchAccounts();
              }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailPage;
