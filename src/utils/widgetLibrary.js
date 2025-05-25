// src/utils/widgetLibrary.js

import {
  FaClock,
  FaStopwatch,
  FaQuoteRight,
  FaCloudSun,
  FaRobot,
  FaComments,
  FaCalculator,
  FaStickyNote,
  FaGlobe,
  FaRss,
  FaChartLine,
  FaBasketballBall,
} from 'react-icons/fa';


import quote from '../components/widgets/configs/quote';
import time from '../components/widgets/configs/time';
import weather from '../components/widgets/configs/weather';
import aisummary from '../components/widgets/configs/aisummary';
import chat from '../components/widgets/configs/chat';
import calculator from '../components/widgets/configs/calculator';
import notes from '../components/widgets/configs/notes';

import RssWidget from '../components/widgets/RssWidget';
import StocksWidget from '../components/widgets/StocksWidget';
import SportsScoresWidget from '../components/widgets/SportsScoresWidget';

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
    ...notes,
    icon: <FaStickyNote size={40} />,
    label: 'Notepad',
    w: 4,
    h: 4,
  },
  // New widgets
  {
    id: 'rss',
    component: RssWidget,
    icon: <FaRss size={40} />,
    label: 'RSS Feed',
    w: 4,
    h: 4,
    defaultSettings: { feedUrl: 'https://hnrss.org/frontpage' },
  },
  {
    id: 'stocks',
    component: StocksWidget,
    icon: <FaChartLine size={40} />,
    label: 'Stocks & Crypto',
    w: 4,
    h: 4,
    defaultSettings: { symbols: ['AAPL', 'GOOG'], crypto: ['bitcoin', 'ethereum'] },
  },
  {
    id: 'sports',
    component: SportsScoresWidget,
    icon: <FaBasketballBall size={40} />,
    label: "Today's NBA Games",
    w: 4,
    h: 4,
  },
];
