// src/pages/dashboard.js
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('../components/Dashboard'), {
  ssr: false, // Disable SSR for this page
});

export default Dashboard;
