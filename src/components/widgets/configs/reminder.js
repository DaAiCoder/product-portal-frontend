// File: C:\Users\Rolan\Downloads\Product-portal-frontend\src\components\widgets\configs\reminder.js

import { FaBell } from 'react-icons/fa';
import ReminderWidget from '../ReminderWidget';

export default {
  id: 'reminder',
  name: 'Reminders',
  icon: FaBell,
  component: ReminderWidget,
  defaultConfig: {
    refreshInterval: 300000, // 5 minutes
  },
};
