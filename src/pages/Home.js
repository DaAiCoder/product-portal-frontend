// File: src/pages/Home.js
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import WidgetCard from '../components/WidgetCard';
import Feeds from './Feeds';
import Notes from './notes';
import Profile from './Profile';

export default function Home() {
  return (
    <DashboardLayout>
      <WidgetCard title="News Feed" minHeight={300}>
        <Feeds />
      </WidgetCard>
      <WidgetCard title="Quick Notes" minHeight={300}>
        <Notes />
      </WidgetCard>
      <WidgetCard title="Profile Overview" minHeight={200}>
        <Profile />
      </WidgetCard>
      {/* add more WidgetCard blocks here as you build out more widgets */}
    </DashboardLayout>
  );
}
