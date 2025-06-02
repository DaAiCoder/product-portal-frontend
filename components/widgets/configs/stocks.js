//Product-portal-frontend\src\components\widgets\configs\stocks.js

import { FaChartLine } from 'react-icons/fa';
import StocksWidget from '../StocksWidget';

export default {
  id: 'stocks',
  name: 'Stocks',
  icon: FaChartLine,
  component: StocksWidget,
  defaultConfig: {
    symbols: ['AAPL', 'GOOGL', 'AMZN'],  // default symbols to display
    refreshInterval: 300000,             // 5 minutes
  },
};
