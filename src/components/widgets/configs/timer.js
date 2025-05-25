//Product-portal-frontend\src\components\widgets\configs\time.js

import { FaClock } from 'react-icons/fa';
import TimerWidget from '../TimerWidget';

export default {
  id: 'time',
  name: 'Time',
  icon: FaClock,
  component: TimerWidget,
  defaultConfig: {
    refreshInterval: 60000, // update every minute for clock & stopwatch
  },
};
