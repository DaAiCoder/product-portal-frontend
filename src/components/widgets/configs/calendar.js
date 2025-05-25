// File: Product-portal-frontend\src\components\widgets\configs\calendar.js

import { FaCalendar } from 'react-icons/fa';
import CalendarWidget from '../CalendarWidget';

export default {
  id: 'calendar',
  name: 'Calendar',
  icon: FaCalendar,
  component: CalendarWidget,
  defaultConfig: {
    refreshInterval: 300000, // 5 minutes
  },
};
