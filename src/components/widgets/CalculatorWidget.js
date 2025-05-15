// File: src/components/widgets/CalculatorWidget.js
import React, { useState } from 'react';

export default function CalculatorWidget() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (val) => {
    if (val === 'C') {
      setExpression('');
      setResult('');
    } else if (val === '⌫') {
      setExpression((prev) => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        const evalResult = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
        setResult(evalResult);
      } catch {
        setResult('Error');
      }
    } else {
      setExpression((prev) => prev + val);
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', '⌫'
  ];

  return (
    <div className="h-full flex flex-col justify-between text-gray-800 dark:text-white">
      <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 mb-3 text-right">
        <div className="text-sm text-gray-500 dark:text-gray-400">{expression || '0'}</div>
        <div className="text-xl font-semibold">{result || '0'}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleInput(btn)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
