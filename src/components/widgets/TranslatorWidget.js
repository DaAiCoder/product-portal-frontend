// File: src/components/widgets/TranslatorWidget.js

import React, { useState } from 'react';
import { translateText } from '../../api/translatorAPI';
import { FaLanguage } from 'react-icons/fa';

export default function TranslatorWidget({ config }) {
  const { defaultTarget = 'en' } = config;
  const [text, setText] = useState('');
  const [target, setTarget] = useState(defaultTarget);
  const [source, setSource] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    try {
      const { translatedText } = await translateText(text, target, source || undefined);
      setResult(translatedText);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaLanguage className="mr-1" /><strong>Translator</strong>
      </div>
      <textarea
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text to translate"
        className="w-full p-1 border rounded text-sm mb-2"
      />
      <div className="flex space-x-1 mb-2 text-sm">
        <input
          placeholder="from (optional, e.g. es)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="flex-1 p-1 border rounded"
        />
        <input
          placeholder="to (e.g. en)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="flex-1 p-1 border rounded"
        />
      </div>
      <button
        onClick={handleTranslate}
        className="p-1 border rounded text-sm mb-2"
      >
        Translate
      </button>
      {error && <div className="text-red-500 text-xs">{error}</div>}
      {result && <div className="text-sm mt-1">{result}</div>}
    </div>
  );
}
