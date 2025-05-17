import React from 'react';

function BriefingWidget() {
  return (
    <div className="h-full flex flex-col p-4">
      <h3 className="text-xl font-semibold mb-2">Daily Briefing</h3>
      <p>AI summary coming soon…</p>
    </div>
  );
}

export default {
  id: 'aisummary',
  defaultTitle: 'Daily Briefing',
  defaultW: 4,
  defaultH: 5,
  Component: BriefingWidget,
};
