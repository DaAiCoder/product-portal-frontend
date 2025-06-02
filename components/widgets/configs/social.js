// File: src/components/widgets/configs/social.js

import { FaShareAlt } from 'react-icons/fa';
import SocialFeedWidget from '../SocialFeedWidget';

export default {
  id: 'social',
  name: 'Social Feeds',
  icon: FaShareAlt,
  component: SocialFeedWidget,
  defaultConfig: {
    platforms: [], // e.g. ['twitter', 'facebook', 'reddit']
  },
};
