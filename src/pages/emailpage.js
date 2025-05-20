import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmailDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [folder, setFolder] = useState("INBOX");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    email_address: '',
    imap_host: '',
    imap_port: 993,
    smtp_host: '',
    smtp_port: 465,
    password: '',
    label: '',
    use_ssl: true,
  });

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

  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/email/accounts', newAccount);
      setShowAddForm(false);
      setNewAccount({
        email_address: '',
        imap_host: '',
        imap_port: 993,
        smtp_host: '',
        smtp_port: 465,
        password: '',
        label: '',
        use_ssl: true,
      });
      fetchAccounts();
    } catch (err) {
      alert('Failed to add account.');
      console.error(err);
    }
  };

  return (
    <div className="flex h-[85vh]">
      {/* Sidebar */}
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

        {/* Account Dropdown */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2 text-sm text-gray-500">Accounts</h3>
          <select
            className="w-full p-2 border rounded text-sm"
            value={selectedAccountId || ''}
            onChange={(e) => setSelectedAccountId(e.target.value)}
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.label || acc.email_address}
              </option>
            ))}
          </select>
        </div>

        {/* Add Account Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 text-blue-600 text-sm underline"
        >
          {showAddForm ? 'Cancel' : '➕ Add Account'}
        </button>

        {/* Add Account Form */}
        {showAddForm && (
          <form className="mt-3 space-y-2 text-sm" onSubmit={handleAddAccount}>
            <input
              type="email"
              placeholder="Email"
              value={newAccount.email_address}
              onChange={(e) => setNewAccount({ ...newAccount, email_address: e.target.value })}
              className="w-full p-1 border rounded"
              required
            />
            <input
              type="text"
              placeholder="IMAP Host"
              value={newAccount.imap_host}
              onChange={(e) => setNewAccount({ ...newAccount, imap_host: e.target.value })}
              className="w-full p-1 border rounded"
              required
            />
            <input
              type="number"
              placeholder="IMAP Port"
              value={newAccount.imap_port}
              onChange={(e) => setNewAccount({ ...newAccount, imap_port: parseInt(e.target.value) })}
              className="w-full p-1 border rounded"
              required
            />
            <input
              type="text"
              placeholder="SMTP Host"
              value={newAccount.smtp_host}
              onChange={(e) => setNewAccount({ ...newAccount, smtp_host: e.target.value })}
              className="w-full p-1 border rounded"
              required
            />
            <input
              type="number"
              placeholder="SMTP Port"
              value={newAccount.smtp_port}
              onChange={(e) => setNewAccount({ ...newAccount, smtp_port: parseInt(e.target.value) })}
              className="w-full p-1 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newAccount.password}
              onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
              className="w-full p-1 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Label (optional)"
              value={newAccount.label}
              onChange={(e) => setNewAccount({ ...newAccount, label: e.target.value })}
              className="w-full p-1 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-1 rounded"
            >
              Save
            </button>
          </form>
        )}
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

