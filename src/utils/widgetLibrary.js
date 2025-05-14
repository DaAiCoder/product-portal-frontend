// File: src/utils/widgetLibrary.js
import DateTimeWidget from '../components/widgets/DateTimeWidget';
import TimerWidget    from '../components/widgets/TimerWidget';
import QuoteWidget    from '../components/widgets/QuoteWidget';
import WeatherWidget  from '../components/widgets/WeatherWidget';
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
    id: 'timer',
    defaultTitle: 'Focus Timer',
    defaultW: 4,
    defaultH: 4,
    Component: TimerWidget,
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
