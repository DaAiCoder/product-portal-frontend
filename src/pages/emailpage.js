import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OAUTH_PROVIDERS = [
  { key: 'google', label: 'Gmail' },
  { key: 'outlook', label: 'Outlook / Hotmail' },
  { key: 'yahoo', label: 'Yahoo' },
  { key: 'aol', label: 'AOL' },
  { key: 'icloud', label: 'iCloud' }
];

const DOMAIN_LOOKUP = {
  "protonmail.com": {
    imap_host: "imap.protonmail.com",
    imap_port: 993,
    smtp_host: "smtp.protonmail.com",
    smtp_port: 465
  },
  "zoho.com": {
    imap_host: "imap.zoho.com",
    imap_port: 993,
    smtp_host: "smtp.zoho.com",
    smtp_port: 465
  },
  "icloud.com": {
    imap_host: "imap.mail.me.com",
    imap_port: 993,
    smtp_host: "smtp.mail.me.com",
    smtp_port: 587
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
  const [activeTab, setActiveTab] = useState("google");
  const [manualForm, setManualForm] = useState({
    email_address: '',
    imap_host: '',
    imap_port: 993,
    smtp_host: '',
    smtp_port: 465,
    password: '',
    label: '',
    use_ssl: true
  });

  useEffect(() => { fetchAccounts(); }, []);

  const fetchAccounts = async () => {
    const res = await axios.get('/api/email/accounts');
    setAccounts(res.data);
    if (res.data.length > 0) {
      setSelectedAccountId(res.data[0].id);
    }
  };

  useEffect(() => {
    if (selectedAccountId) fetchInbox();
  }, [selectedAccountId, folder]);

  const fetchInbox = async () => {
    setLoading(true);
    const res = await axios.get(`/api/email/inbox?account_id=${selectedAccountId}&folder=${folder}`);
    setEmails(res.data);
    setLoading(false);
  };

  const handleSelectEmail = async (uid) => {
    const res = await axios.get(`/api/email/message/${uid}?account_id=${selectedAccountId}&folder=${folder}`);
    setSelectedEmail(res.data);
  };

  const handleManualEmail = (email) => {
    const domain = email.split("@")[1];
    const match = DOMAIN_LOOKUP[domain];
    setManualForm((prev) => ({
      ...prev,
      email_address: email,
      imap_host: match?.imap_host || '',
      imap_port: match?.imap_port || 993,
      smtp_host: match?.smtp_host || '',
      smtp_port: match?.smtp_port || 465
    }));
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/email/accounts', manualForm);
    setShowModal(false);
    setManualForm({
      email_address: '',
      imap_host: '',
      imap_port: 993,
      smtp_host: '',
      smtp_port: 465,
      password: '',
      label: '',
      use_ssl: true
    });
    fetchAccounts();
  };

  const triggerOAuth = (provider) => {
    window.location.href = `/auth/${provider}`;
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
            onClick={() => { setSelectedEmail(null); setFolder(f); }}
          >
            {f}
          </div>
        ))}

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
        ) : (
          emails.map((email) => (
            <div
              key={email.uid}
              className="cursor-pointer border-b py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleSelectEmail(email.uid)}
            >
              <p className="font-semibold text-sm truncate">{email.subject}</p>
              <p className="text-sm text-gray-600 truncate">{email.from}</p>
              <p className="text-xs text-gray-400">{email.date}</p>
              <p className="text-sm mt-1 text-gray-700 truncate">{email.body}</p>
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
          <div className="bg-white dark:bg-gray-900 p-6 rounded max-w-2xl w-full shadow-lg">
            <h3 className="text-lg font-bold mb-4">Connect Email Account</h3>

            <div className="flex space-x-2 mb-4">
              {OAUTH_PROVIDERS.map((p) => (
                <button
                  key={p.key}
                  className={`px-4 py-2 rounded border text-sm ${
                    activeTab === p.key ? 'bg-blue-600 text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => triggerOAuth(p.key)}
                >
                  Sign in with {p.label}
                </button>
              ))}
              <button
                className={`px-4 py-2 rounded border text-sm ${
                  activeTab === "manual" ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveTab("manual")}
              >
                Other / Manual
              </button>
            </div>

            {activeTab === "manual" && (
              <form onSubmit={handleManualSubmit} className="grid grid-cols-2 gap-4 text-sm">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={manualForm.email_address}
                  onChange={(e) => handleManualEmail(e.target.value)}
                  required
                  className="col-span-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="IMAP Host"
                  value={manualForm.imap_host}
                  onChange={(e) => setManualForm({ ...manualForm, imap_host: e.target.value })}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="IMAP Port"
                  value={manualForm.imap_port}
                  onChange={(e) => setManualForm({ ...manualForm, imap_port: parseInt(e.target.value) })}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="SMTP Host"
                  value={manualForm.smtp_host}
                  onChange={(e) => setManualForm({ ...manualForm, smtp_host: e.target.value })}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="SMTP Port"
                  value={manualForm.smtp_port}
                  onChange={(e) => setManualForm({ ...manualForm, smtp_port: parseInt(e.target.value) })}
                  className="p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password (App Password)"
                  value={manualForm.password}
                  onChange={(e) => setManualForm({ ...manualForm, password: e.target.value })}
                  className="col-span-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Label (optional)"
                  value={manualForm.label}
                  onChange={(e) => setManualForm({ ...manualForm, label: e.target.value })}
                  className="col-span-2 p-2 border rounded"
                />
                <div className="col-span-2 flex justify-end space-x-2 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-1 border rounded">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
