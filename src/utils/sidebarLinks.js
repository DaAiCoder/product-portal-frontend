// src/utils/sidebarLinks.js
import {
  FaEnvelope,
  FaCalendarAlt,
  FaStickyNote,
  FaBell,
  FaLayerGroup,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaRedditAlien,
  FaFolderOpen,
  FaComments,
  FaRss,
  FaFire,
  FaYoutube,
  FaMusic,
  FaPodcast
} from 'react-icons/fa';

export const sidebarSections = [
  {
    id: 'productivity',
    label: 'Productivity',
    icon: <FaLayerGroup />,
    items: [
      { id: 'email',     label: 'Email',       icon: <FaEnvelope />,    to: '/email' },
      { id: 'calendar',  label: 'Calendar',    icon: <FaCalendarAlt/>, to: '/calendar' },
      { id: 'notes',     label: 'Notes',       icon: <FaStickyNote/>,  to: '/notes' },
      { id: 'reminders', label: 'Reminders',   icon: <FaBell />,        to: '/reminders' },
    ],
  },
  {
    id: 'social-feeds',
    label: 'Social Feeds',
    icon: <FaLayerGroup />,
    items: [
      { id: 'unified',    label: 'Unified Feed', icon: <FaLayerGroup/>,  to: '/unified' },
      { id: 'instagram',  label: 'Instagram',    icon: <FaInstagram/>,   to: '/instagram' },
      { id: 'twitter',    label: 'Twitter/X',    icon: <FaTwitter/>,     to: '/twitter' },
      { id: 'facebook',   label: 'Facebook',     icon: <FaFacebook/>,    to: '/facebook' },
      { id: 'reddit',     label: 'Reddit',       icon: <FaRedditAlien/>, to: '/reddit' },
    ],
  },
  {
    id: 'file-manager',
    label: 'File Manager',
    icon: <FaFolderOpen />,
    to: '/files',
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: <FaComments />,
    to: '/chat',
  },
  {
    id: 'news',
    label: 'News',
    icon: <FaRss />,
    items: [
      { id: 'rss',      label: 'RSS Feeds',      icon: <FaRss />,  to: '/rss' },
      { id: 'trending', label: 'Trending',       icon: <FaFire />, to: '/trending' },
    ],
  },
  {
    id: 'video-media',
    label: 'Video & Media',
    icon: <FaYoutube />,
    items: [
      { id: 'youtube',  label: 'YouTube',    icon: <FaYoutube/>, to: '/youtube' },
      { id: 'music',    label: 'Music',      icon: <FaMusic/>,   to: '/music' },
      { id: 'podcasts', label: 'Podcasts',   icon: <FaPodcast/>, to: '/podcasts' },
    ],
  },
];
