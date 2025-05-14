// File: src/utils /widgetLibrary.js

import DateTimeWidget from '../components/widgets/DateTimeWidget';
import TimerWidget    from '../components/widgets/TimerWidget';
import QuoteWidget    from '../components/widgets/QuoteWidget';
// …import any other widgets you have…

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
    defaultTitle: 'Timer',
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
  // …add entries for your remaining widgets…
];
