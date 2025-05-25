// File:Product-portal-frontend\src\components\widgets\EmailWidget.js

import React, { useEffect, useState } from 'react';
import { fetchEmails } from '../../api/emailAPI';
import { FaEnvelope } from 'react-icons/fa';

export default function EmailWidget({ config }) {
  const { folder = 'inbox', refreshInterval = 300000 } = config;
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);

  const loadEmails = async () => {
    try {
      const data = await fetchEmails(folder);
      setEmails(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadEmails();
    const iv = setInterval(loadEmails, refreshInterval);
    return () => clearInterval(iv);
  }, [folder, refreshInterval]);

  if (error) return <div className="p-2 text-red-500">Error: {error}</div>;
  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaEnvelope className="mr-1" />
        <strong>{folder.charAt(0).toUpperCase() + folder.slice(1)}</strong>
      </div>
      {emails.length === 0 ? (
        <div className="text-sm text-gray-500">No messages</div>
      ) : (
        <ul className="text-sm space-y-1 overflow-y-auto max-h-40">
          {emails.slice(0, 5).map((email) => (
            <li key={email.id} className="truncate">
              <strong>{email.from}</strong>: {email.subject}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
