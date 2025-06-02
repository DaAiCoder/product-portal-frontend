// File: src/components/widgets/configs/crypto.js

import { FaBitcoin } from 'react-icons/fa';
import CryptoWidget from '../CryptoWidget';

export default {
  id: 'crypto',
  name: 'Crypto',
  icon: FaBitcoin,
  component: CryptoWidget,
  defaultConfig: {
    symbols: ['BTC', 'ETH', 'DOGE'],
    refreshInterval: 300000, // 5 minutes
    showHistory: false,
  },
};
