import React, { useState } from 'react';

function CalculatorWidget() {
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

  const getButtonClass = (btn) => {
    if (btn === '=') return 'bg-green-600 hover:bg-green-700';
    if (btn === 'C' || btn === '⌫') return 'bg-red-500 hover:bg-red-600';
    return 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <div className="h-full flex flex-col justify-between text-gray-800 dark:text-white">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-inner font-mono">
        <div className="text-sm text-gray-500 dark:text-gray-400 break-words min-h-[1.25rem]">{expression || '0'}</div>
        <div className="text-2xl font-bold mt-1 text-right">{result || '0'}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleInput(btn)}
            className={`${getButtonClass(btn)} text-white font-semibold py-2 rounded transition duration-150 ease-in-out`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default {
  id: 'calculator',
  defaultTitle: 'Calculator',
  defaultW: 4,
  defaultH: 5,
  Component: CalculatorWidget,
};
