// File: src/utils/widgetLibrary.js

import {
  FaClock,
  FaQuoteRight,
  FaCloudSun,
  FaRobot,
  FaComments,
  FaCalculator,
  FaStickyNote,
  FaRss,
  FaChartLine,
  FaBasketballBall,
} from 'react-icons/fa';

// Widget configs
import timerConfig from '../components/widgets/configs/timer';
import quoteConfig from '../components/widgets/configs/quote';
import weatherConfig from '../components/widgets/configs/weather';
import aiSummaryConfig from '../components/widgets/configs/aisummary';
import chatConfig from '../components/widgets/configs/chat';
import calculatorConfig from '../components/widgets/configs/calculator';
import notesConfig from '../components/widgets/configs/notes';

// Widget components
import TimerWidget from '../components/widgets/TimerWidget';
import QuoteWidget from '../components/widgets/QuoteWidget';
import WeatherWidget from '../components/widgets/WeatherWidget';
import AISummaryWidget from '../components/widgets/AISummaryWidget';
import ChatWidget from '../components/widgets/ChatWidget';
import CalculatorWidget from '../components/widgets/CalculatorWidget';
import NotesWidget from '../components/widgets/NotesWidget';

// New widgets
import RssWidget from '../components/widgets/RssWidget';
import StocksWidget from '../components/widgets/StocksWidget';
import SportsScoresWidget from '../components/widgets/SportsScoresWidget';

export const widgetLibrary = [
  {
    ...timerConfig,
    component: TimerWidget,
    icon: <FaClock size={40} />,
    label: 'Timer',
    w: 4,
    h: 4,
  },
  {
    ...quoteConfig,
    component: QuoteWidget,
    icon: <FaQuoteRight size={40} />,
    label: 'Quote of the Day',
    w: 4,
    h: 4,
  },
  {
    ...weatherConfig,
    component: WeatherWidget,
    icon: <FaCloudSun size={40} />,
    label: 'Weather',
    w: 4,
    h: 4,
  },
  {
    ...aiSummaryConfig,
    component: AISummaryWidget,
    icon: <FaRobot size={40} />,
    label: 'AI Summary',
    w: 4,
    h: 5,
  },
  {
    ...chatConfig,
    component: ChatWidget,
    icon: <FaComments size={40} />,
    label: 'Chat',
    w: 4,
    h: 5,
  },
  {
    ...calculatorConfig,
    component: CalculatorWidget,
    icon: <FaCalculator size={40} />,
    label: 'Calculator',
    w: 4,
    h: 4,
  },
  {
    ...notesConfig,
    component: NotesWidget,
    icon: <FaStickyNote size={40} />,
    label: 'Notepad',
    w: 4,
    h: 4,
  },
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
