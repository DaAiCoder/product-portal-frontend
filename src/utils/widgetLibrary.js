// File: src/utils/widgetLibrary.js
import DateTimeWidget from '../components/DateTimeWidget';
import PomodoroWidget from '../components/PomodoroWidget';
import QuoteWidget from '../components/QuoteWidget';
import WeatherWidget from '../components/WeatherWidget';
import AiSummaryWidget from '../components/BriefingWidget';
import ChatWidget from '../components/widgets/ChatWidget';

export const widgetLibrary = [
  {
    id: 'datetime',
    defaultTitle: 'Date & Time',
    defaultW: 4,
    defaultH: 4,
    Component: DateTimeWidget,
  },
  {
    id: 'pomodoro',
    defaultTitle: 'Pomodoro Timer',
    defaultW: 4,
    defaultH: 4,
    Component: PomodoroWidget,
  },
  {
    id: 'quote',
    defaultTitle: 'Quote of the Day',
    defaultW: 4,
    defaultH: 4,
    Component: QuoteWidget,
  },
  {
    id: 'weather',
    defaultTitle: 'Local Weather',
    defaultW: 4,
    defaultH: 4,
    Component: WeatherWidget,
  },
  {
    id: 'aisummary',
    defaultTitle: 'Daily Briefing',
    defaultW: 4,
    defaultH: 4,
    Component: AiSummaryWidget,
  },
{
  id: 'chat',
  defaultTitle: 'Chat',
  defaultW: 6,
  defaultH: 8,
  Component: ChatWidget,
},
];
