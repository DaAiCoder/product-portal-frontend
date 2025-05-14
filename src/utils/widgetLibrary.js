// File: src/utils/widgetLibrary.js
import DateTimeWidget from '../components/DateTimeWidget';
import PomodoroWidget from '../components/PomodoroWidget';
import QuoteWidget from '../components/widgets/QuoteWidget';
import WeatherWidget from '../components/widgets/WeatherWidget';
import AiSummaryWidget from '../components/widgets/AiSummaryWidget';

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
];
