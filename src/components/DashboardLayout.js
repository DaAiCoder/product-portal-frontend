import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { listNotes } from '../services/notesService';
import { getFollowedTopics } from '../services/userPreferences';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardLayout() {
  const [notes, setNotes] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedNotes = await listNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        console.error('Failed to fetch notes', err);
      }

      try {
        const fetchedTopics = await getFollowedTopics();
        setTopics(fetchedTopics);
      } catch (err) {
        console.error('Error fetching followed topics', err);
      }
    })();
  }, []);

  const layout = [
    { i: 'notes', x: 0, y: 0, w: 4, h: 4 },
    { i: 'topics', x: 4, y: 0, w: 4, h: 4 },
    // add more as needed
  ];

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 10, sm: 6 }}
      rowHeight={30}
      onLayoutChange={() => {}}
    >
      <div key="notes" className="p-4 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Your Notes</h3>
        {notes.length
          ? notes.map(n => <p key={n.id}>{n.content_html || n.content}</p>)
          : <p className="text-gray-500">No notes yet.</p>}
      </div>

      <div key="topics" className="p-4 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Followed Topics</h3>
        {topics.length
          ? topics.map((t,i) => <span key={i} className="inline-block mr-2 px-2 py-1 bg-blue-100 rounded">{t}</span>)
          : <p className="text-gray-500">No topics followed.</p>}
      </div>

      {/* Add more widget divs here */}
    </ResponsiveGridLayout>
  );
}
