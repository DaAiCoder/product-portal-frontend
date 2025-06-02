// File: src/components/widgets/configs/translator.js

import { FaLanguage } from 'react-icons/fa';
import TranslatorWidget from '../TranslatorWidget';

export default {
  id: 'translator',
  name: 'Translator',
  icon: FaLanguage,
  component: TranslatorWidget,
  defaultConfig: {
    defaultTarget: 'en',
  },
};
