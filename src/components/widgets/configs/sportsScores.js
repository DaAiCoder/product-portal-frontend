//Product-portal-frontend\src\components\widgets\configs\sportsScores.js

import { FaFutbol } from 'react-icons/fa';
import SportsScoresWidget from '../sportsScoresWidget';

export default {
  id: 'sportsScores',
  name: 'Sports Scores',
  icon: FaFutbol,
  component: SportsScoresWidget,
  defaultConfig: {
    refreshInterval: 300000, // 5 minutes
  },
};
