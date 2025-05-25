//Product-portal-frontend\src\components\widgets\configs\time.js

import { FaClock } from 'react-icons/fa';
import TimeWidget from '../TimeWidget';

export default {
  id: 'time',
  name: 'Time',
  icon: FaClock,
  component: TimeWidget,
  defaultConfig: {
    refreshInterval: 60000, // update every minute for clock & stopwatch
  },
};
