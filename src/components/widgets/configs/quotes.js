//Product-portal-frontend\src\components\widgets\configs\quotes.js

import { FaQuoteLeft } from 'react-icons/fa';
import QuotesWidget from '../QuotesWidget';

export default {
  id: 'quotes',
  name: 'Quotes',
  icon: FaQuoteLeft,
  component: QuotesWidget,
  defaultConfig: {
    category: '', // e.g. "inspirational", "humor", etc.
  },
};
