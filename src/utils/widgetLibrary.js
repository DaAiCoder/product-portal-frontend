// File: src/utils/widgetLibrary.js
import datetime from '../components/widgets/configs/datetime';
import stopwatch from '../components/widgets/configs/stopwatch';
import quote from '../components/widgets/configs/quote';
import weather from '../components/widgets/configs/weather';
import aisummary from '../components/widgets/configs/aisummary';
import chat from '../components/widgets/configs/chat';
import calculator from '../components/widgets/configs/calculator';
import worldclock from '../components/widgets/configs/worldclock';

export const widgetLibrary = [
  {
    ...datetime,
    defaultW: 4,
    defaultH: 4,
  },
  {
    ...stopwatch,
    defaultW: 4,
    defaultH: 4,
  },
  {
    ...quote,
    defaultW: 4,
    defaultH: 3,
  },
  {
    ...weather,
    defaultW: 4,
    defaultH: 4,
  },
  {
    ...aisummary,
    defaultW: 4,
    defaultH: 5,
  },
  {
    ...chat,
    defaultW: 6,
    defaultH: 8,
  },
  {
    ...calculator,
    defaultW: 4,
    defaultH: 5,
  },
  {
    ...worldclock,
    defaultW: 4,
    defaultH: 6,
  },
];
