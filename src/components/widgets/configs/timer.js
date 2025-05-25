// File: src/components/widgets/configs/timer.js

import { FaHourglassStart } from 'react-icons/fa';
import TimerWidget from '../TimerWidget';

export default {
  id: 'timer',
  name: 'Timer',
  icon: FaHourglassStart,
  component: TimerWidget,
  defaultConfig: {
    refreshInterval: 60000, // 1 minute polling
  },
};
