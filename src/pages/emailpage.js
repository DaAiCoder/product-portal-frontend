import React, { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EmailPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch email accounts from backend
  const fetchAccounts = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchAccounts();
    // Listen for OAuth popup completion
    const handleMessage = (event) => {
      // Optionally check event.origin here for extra security
      if (event.data === 'oauth-success') {
        fetchAccounts();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
    // eslint-disable-next-line
  }, []);

  // Google login popup
  const handleGoogleLogin = () => {
    const width = 500, height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      `${API_BASE}/auth/google/email-connect`,
      'google-oauth',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Your Email Accounts</h1>
        <button
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          onClick={handleGoogleLogin}
        >
          Add Google Account
        </button>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : accounts.length === 0 ? (
          <div className="text-gray-500">No accounts linked yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {accounts.map((account, i) => (
              <li key={i} className="py-2">{account}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

