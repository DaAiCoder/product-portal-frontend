// File: src/utils/widgetLibrary.js
import { FaClock, FaStopwatch, FaQuoteRight, FaCloudSun, FaRobot, FaComments, FaCalculator, FaGlobe } from 'react-icons/fa';

import datetime from '../components/widgets/configs/datetime';
import stopwatch from '../components/widgets/configs/stopwatch';
import quote from '../components/widgets/configs/quote';
import weather from '../components/widgets/configs/weather';
import aisummary from '../components/widgets/configs/aisummary';
import chat from '../components/widgets/configs/chat';
import calculator from '../components/widgets/configs/calculator';
import worldclock from '../components/widgets/configs/worldclock';
import NotesWidget from '../components/widgets/configs/NotesWidget';

export const widgetLibrary = [
  {
    ...datetime,
    icon: <FaClock size={40} />,
    label: 'Date & Time',
    w: 4,
    h: 4,
  },
  {
    ...stopwatch,
    icon: <FaStopwatch size={40} />,
    label: 'Stopwatch',
    w: 4,
    h: 4,
  },
  {
    ...quote,
    icon: <FaQuoteRight size={40} />,
    label: 'Quote of the Day',
    w: 4,
    h: 4,
  },
  {
    ...weather,
    icon: <FaCloudSun size={40} />,
    label: 'Weather',
    w: 4,
    h: 4,
  },
  {
    ...aisummary,
    icon: <FaRobot size={40} />,
    label: 'AI Summary',
    w: 4,
    h: 4,
  },
  {
    ...chat,
    icon: <FaComments size={40} />,
    label: 'Chat',
    w: 4,
    h: 5,
  },
  {
    ...calculator,
    icon: <FaCalculator size={40} />,
    label: 'Calculator',
    w: 4,
    h: 4,
  },
  {
    ...worldclock,
    icon: <FaGlobe size={40} />,
    label: 'World Clock',
    w: 4,
    h: 4,
  },

  {
      {
    ...NotesWidget,
    icon: <FaStickyNote size={40} />,
    label: 'Notepad',
    w: 4,
    h: 4,
  },

  },

];
