import React from "react";

const AISummaryWidget = () => {
  return (
    <div className="h-full flex flex-col p-4 rounded-2xl shadow bg-white dark:bg-gray-900">
      <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
      <p>
        Welcome! Your AI-generated daily briefing or summary will appear here.
        This widget will soon provide proactive updates, smart digests, and actionable insights based on your emails, calendar, and recent activities.
      </p>
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <span>Coming soon…</span>
      </div>
    </div>
  );
};

export default AISummaryWidget;
