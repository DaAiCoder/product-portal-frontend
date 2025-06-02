//Product-portal-frontend\src\components\widgets\configs\weather.js

import { FaCloudSun } from 'react-icons/fa';
import WeatherWidget from '../WeatherWidget';

export default {
  id: 'weather',
  name: 'Weather',
  icon: FaCloudSun,
  component: WeatherWidget,
  defaultConfig: {
    location: '',          // your default location (e.g., 'New York')
    units: 'celsius',      // 'celsius' or 'fahrenheit'
    refreshInterval: 600000, // 10 minutes
  },
};
