import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PROVIDERS = {
  gmail: {
    label: 'Gmail',
    imap_host: 'imap.gmail.com',
    imap_port: 993,
    smtp_host: 'smtp.gmail.com',
    smtp_port: 465
  },
  yahoo: {
    label: 'Yahoo',
    imap_host: 'imap.mail.yahoo.com',
    imap_port: 993,
    smtp_host: 'smtp.mail.yahoo.com',
    smtp_port: 465
  },
  outlook: {
    label: 'Outlook / Hotmail',
    imap_host: 'imap-mail.outlook.com',
    imap_port: 993,
    smtp_host: 'smtp-mail.outlook.com',
    smtp_port: 587
  },
  custom: {
    label: 'Other / Manual',
    imap_host: '',
    imap_port: 993,
    smtp_host: '',
    smtp_port: 465
  }
};

export default function EmailDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [folder, setFolder] = useState("INBOX");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [provider, setProvider] = useState("gmail");

  const [form, setForm] = useState({
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

  const handleProviderSelect = (key) => {
    setProvider(key);
    setForm({
      ...form,
      imap_host: PROVIDERS[key].imap_host,
      imap_port: PROVIDERS[key].imap_port,
      smtp_host: PROVIDERS[key].smtp_host,
      smtp_port: PROVIDERS[key].smtp_port
    });
  };

  const handleSubmitAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/email/accounts', form);
      setShowModal(false);
      fetchAccounts();
      setForm({
        email_address: '',
        imap_host: '',
        imap_port: 993,
        smtp_host: '',
        smtp_port: 465,
        password: '',
        label: '',
        use_ssl: true,
      });
    } catch (err) {
      alert('Failed to add account');
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

        {/* Account Selector */}
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
          onClick={() => setShowModal(true)}
          className="mt-4 text-blue-600 text-sm underline"
        >
          ➕ Add Account
        </button>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add Email Account</h3>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.keys(PROVIDERS).map((key) => (
                <button
                  key={key}
                  onClick={() => handleProviderSelect(key)}
                  className={`p-2 border rounded text-sm ${
                    provider === key ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {PROVIDERS[key].label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmitAccount} className="space-y-2 text-sm">
              <input
                type="email"
                placeholder="Email Address"
                value={form.email_address}
                onChange={(e) => setForm({ ...form, email_address: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
              {provider === "custom" && (
                <>
                  <input
                    type="text"
                    placeholder="IMAP Host"
                    value={form.imap_host}
                    onChange={(e) => setForm({ ...form, imap_host: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="IMAP Port"
                    value={form.imap_port}
                    onChange={(e) => setForm({ ...form, imap_port: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="SMTP Host"
                    value={form.smtp_host}
                    onChange={(e) => setForm({ ...form, smtp_host: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="SMTP Port"
                    value={form.smtp_port}
                    onChange={(e) => setForm({ ...form, smtp_port: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded"
                  />
                </>
              )}
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Label (optional)"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1 text-sm border rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 text-sm rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
