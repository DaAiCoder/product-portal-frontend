// File: src/components/widgets/configs/music.js

import { FaMusic } from 'react-icons/fa';
import MusicWidget from '../MusicWidget';

export default {
  id: 'music',
  name: 'Music',
  icon: FaMusic,
  component: MusicWidget,
  defaultConfig: {
    // no user-configurable settings
  },
};
