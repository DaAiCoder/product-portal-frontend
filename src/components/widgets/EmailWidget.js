import React from 'react';

const EmailWidget = ({ emailAccounts = [], onRefresh = () => {} }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">📧 Email Accounts</h2>
      {emailAccounts.length === 0 ? (
        <p className="text-sm text-gray-500">No accounts connected.</p>
      ) : (
        <ul className="space-y-1">
          {emailAccounts.map((email, index) => (
            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
              {email}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onRefresh}
        className="mt-3 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        🔄 Refresh Inbox
      </button>
    </div>
  );
};

export default EmailWidget;
