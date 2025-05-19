// File: src/utils/sidebarLinks.js
import {
  FaEnvelope,
  FaCalendarAlt,
  FaStickyNote,
  FaFolderOpen,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaRss,
  FaComments,
  FaCubes,
} from 'react-icons/fa';

import { widgetLibrary } from './widgetLibrary';

const widgetIcons = {
  datetime: '📅',
  stopwatch: '⏱️',
  quote: '💬',
  weather: '☁️',
  aisummary: '🧠',
  chat: '💬',
  calculator: '🧮',
  worldclock: '🌍',
};

export const sidebarSections = [
  {
    id: 'productivity',
    label: 'Productivity',
    color: 'blue',
    icon: null,
    items: [
      { id: 'email', to: '/email', icon: <FaEnvelope />, label: 'Email' }, // ✅ Links to emailpage.js route
      { id: 'calendar', to: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
      { id: 'notes', to: '/notes', icon: <FaStickyNote />, label: 'Notes' },
      { id: 'files', to: '/files', icon: <FaFolderOpen />, label: 'Files' },
      { id: 'clock', to: '/clock', icon: <FaClock />, label: 'Clock' },
    ],
  },
  {
    id: 'social',
    label: 'Social Feeds',
    color: 'green',
    icon: null,
    items: [
      { id: 'facebook', to: '/social/facebook', icon: <FaFacebook />, label: 'Facebook' },
      { id: 'instagram', to: '/social/instagram', icon: <FaInstagram />, label: 'Instagram' },
      { id: 'twitter', to: '/social/twitter', icon: <FaTwitter />, label: 'Twitter (X)' },
      { id: 'rss', to: '/social/rss', icon: <FaRss />, label: 'RSS Feeds' },
    ],
  },
  {
    id: 'chat',
    label: 'Chat',
    color: 'purple',
    icon: <FaComments />,
    to: '/chat',
  },
  {
    id: 'widgets',
    label: 'Widgets',
    color: 'gray',
    icon: <FaCubes />,
    items: widgetLibrary.map((w) => ({
      id: w.id,
      to: `/widgets/${w.id}`,
      icon: widgetIcons[w.id] || '🧩',
      label: w.defaultTitle,
    })),
  },
];
