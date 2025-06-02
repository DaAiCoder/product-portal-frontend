// File:Product-portal-frontend\src\components\widgets\configs\email.js

import { FaEnvelope } from 'react-icons/fa';
import EmailWidget from '../EmailWidget';

export default {
  id: 'email',
  name: 'Email',
  icon: FaEnvelope,
  component: EmailWidget,
  defaultConfig: {
    folder: 'inbox',
    refreshInterval: 300000, // 5 minutes
  },
};
