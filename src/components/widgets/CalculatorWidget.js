//Product-portal-frontend\src\components\widgets\CalculatorWidget.js

import React, { useState } from 'react';
import { calculate } from '../../api/calculatorAPI';
import { FaCalculator } from 'react-icons/fa';

export default function CalculatorWidget({ config }) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async (e) => {
    e.preventDefault();
    try {
      const data = await calculate(expression);
      setResult(data.result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center mb-2">
        <FaCalculator className="mr-1" />
        <strong>Calculator</strong>
      </div>
      <form onSubmit={handleCalculate} className="flex space-x-1">
        <input
          type="text"
          placeholder="e.g. 2+2*3"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="flex-1 p-1 border rounded"
        />
        <button
          type="submit"
          className="p-1 border rounded"
        >
          =
        </button>
      </form>
      {result !== null && (
        <div className="mt-2 text-lg">Result: {result}</div>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-500">Error: {error}</div>
      )}
    </div>
  );
}
