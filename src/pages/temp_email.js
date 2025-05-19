import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmailDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [composeMode, setComposeMode] = useState(false);
  const [form, setForm] = useState({ to: '', subject: '', body: '' });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await axios.get('/api/email/accounts');
    setAccounts(res.data);
    if (res.data.length > 0) {
      setSelectedAccountId(res.data[0].id);
    }
  };

  useEffect(() => {
    if (selectedAccountId) fetchInbox();
  }, [selectedAccountId]);

  const fetchInbox = async () => {
    setRefreshing(true);
    const res = await axios.get(`/api/email/inbox?account_id=${selectedAccountId}`);
    setEmails(res.data);
    setRefreshing(false);
  };

  const handleSend = async () => {
    await axios.post('/api/email/send', {
      account_id: selectedAccountId,
      to: form.to,
      subject: form.subject,
      body: form.body
    });
    alert('Email sent!');
    setComposeMode(false);
    setForm({ to: '', subject: '', body: '' });
  };

  const handleDelete = async (uid) => {
    await axios.delete(`/api/email/message/${uid}?account_id=${selectedAccountId}`);
    fetchInbox();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📧 Email Dashboard</h2>
        <button onClick={() => setComposeMode(true)} className="bg-blue-600 text-white px-3 py-1 rounded">
          + Compose
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Account:</label>
        <select
          value={selectedAccountId || ''}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.label || acc.email_address}
            </option>
          ))}
        </select>
        <button onClick={fetchInbox} className="ml-4 text-sm text-blue-500 underline">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded p-2 max-h-[70vh] overflow-y-auto">
          <h3 className="font-semibold mb-2">Inbox</h3>
          {emails.map((email) => (
            <div
              key={email.uid}
              className="cursor-pointer hover:bg-gray-100 p-2 border-b"
              onClick={() => setSelectedEmail(email)}
            >
              <p className="font-medium">{email.subject || '(No Subject)'}</p>
              <p className="text-sm text-gray-500">{email.from}</p>
              <p className="text-xs text-gray-400">{email.date}</p>
            </div>
          ))}
        </div>

        <div className="col-span-2 border rounded p-4 max-h-[70vh] overflow-y-auto">
          {selectedEmail ? (
            <>
              <h3 className="text-lg font-bold">{selectedEmail.subject || '(No Subject)'}</h3>
              <p className="text-sm text-gray-500 mb-2">From: {selectedEmail.from}</p>
              <div className="mb-4 whitespace-pre-wrap">{selectedEmail.body}</div>
              <button
                onClick={() => handleDelete(selectedEmail.uid)}
                className="text-sm text-red-500 underline"
              >
                Delete
              </button>
            </>
          ) : (
            <p>Select an email to view it.</p>
          )}
        </div>
      </div>

      {composeMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-2">Compose Email</h3>
            <input
              type="text"
              placeholder="To"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Body"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="w-full h-32 p-2 border rounded"
            />
            <div className="flex justify-end mt-3">
              <button onClick={handleSend} className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                Send
              </button>
              <button onClick={() => setComposeMode(false)} className="text-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
