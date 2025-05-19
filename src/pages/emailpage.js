import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmailDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [folder, setFolder] = useState("INBOX");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('/api/email/accounts');
      const data = Array.isArray(res.data) ? res.data : [];
      setAccounts(data);
      if (data.length > 0) {
        setSelectedAccountId(data[0].id);
      }
    } catch (err) {
      console.error('Error loading accounts', err);
    }
  };

  useEffect(() => {
    if (selectedAccountId) fetchInbox();
  }, [selectedAccountId, folder]);

  const fetchInbox = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/email/inbox?account_id=${selectedAccountId}&folder=${folder}`);
      setEmails(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch inbox:', err);
    }
    setLoading(false);
  };

  const handleSelectEmail = async (uid) => {
    try {
      const res = await axios.get(`/api/email/message/${uid}?account_id=${selectedAccountId}&folder=${folder}`);
      setSelectedEmail(res.data);
    } catch (err) {
      console.error('Failed to fetch message:', err);
    }
  };

  return (
    <div className="flex h-[85vh]">
      {/* Folders */}
      <div className="w-1/6 border-r p-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="font-bold text-lg mb-4">Folders</h2>
        {["INBOX", "Sent", "Drafts", "Trash"].map((f) => (
          <div
            key={f}
            className={`cursor-pointer p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
              folder === f ? "bg-blue-200 dark:bg-gray-800 font-semibold" : ""
            }`}
            onClick={() => {
              setSelectedEmail(null);
              setFolder(f);
            }}
          >
            {f}
          </div>
        ))}
      </div>

      {/* Email List */}
      <div className="w-2/5 border-r overflow-y-auto p-4">
        <h2 className="font-bold text-lg mb-4">{folder}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : emails.length === 0 ? (
          <p>No emails found.</p>
        ) : (
          emails.map((email) => (
            <div
              key={email.uid}
              className="cursor-pointer border-b py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleSelectEmail(email.uid)}
            >
              <p className="font-semibold text-sm truncate">{email.subject}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{email.from}</p>
              <p className="text-xs text-gray-400">{email.date}</p>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 truncate">{email.body}</p>
            </div>
          ))
        )}
      </div>

      {/* Email Viewer */}
      <div className="w-3/6 p-6 overflow-y-auto">
        {selectedEmail ? (
          <>
            <h2 className="text-xl font-bold mb-2">{selectedEmail.subject}</h2>
            <p className="text-sm text-gray-500 mb-1">From: {selectedEmail.from}</p>
            <p className="text-sm text-gray-500 mb-4">Date: {selectedEmail.date}</p>
            <div className="whitespace-pre-wrap text-sm">{selectedEmail.body}</div>
          </>
        ) : (
          <p className="text-gray-500">Select an email to view it.</p>
        )}
      </div>
    </div>
  );
}
