import React, { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import History from './History';
import { evaluate } from '../utils/mathUtils';

interface CalculatorProps {
  darkMode: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({ darkMode }) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<Array<{ expression: string; result: string }>>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeyPress = (key: string) => {
    setError(null);
    
    switch (key) {
      case '=':
        calculateResult();
        break;
      case 'C':
        clearInput();
        break;
      case '⌫':
        backspace();
        break;
      default:
        appendToInput(key);
    }
  };

  const appendToInput = (value: string) => {
    setInput(prev => prev + value);
  };

  const clearInput = () => {
    setInput('');
    setResult('');
    setError(null);
  };

  const backspace = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const calculateResult = () => {
    if (!input) return;

    try {
      const calculatedResult = evaluate(input);
      setResult(calculatedResult.toString());
      
      // Add to history
      const newEntry = { expression: input, result: calculatedResult.toString() };
      setHistory(prev => [newEntry, ...prev].slice(0, 10)); // Keep only last 10 entries
    } catch (err) {
      setError('Invalid expression');
      console.error('Calculation error:', err);
    }
  };

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  const selectFromHistory = (item: { expression: string; result: string }) => {
    setInput(item.expression);
    setResult(item.result);
    setShowHistory(false);
  };

  useEffect(() => {
    // Allow keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        calculateResult();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        clearInput();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (/[\d+\-*/.()%]/.test(e.key)) {
        appendToInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden transition-colors duration-300`}>
      <Display 
        input={input} 
        result={result} 
        error={error} 
        darkMode={darkMode} 
      />
      
      <div className="flex">
        <div className={`flex-grow ${showHistory ? 'hidden md:block' : 'block'}`}>
          <Keypad onKeyPress={handleKeyPress} darkMode={darkMode} />
        </div>
        
        <div className={`${showHistory ? 'w-full md:w-64' : 'hidden'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <History 
            items={history} 
            onSelect={selectFromHistory} 
            darkMode={darkMode}
          />
        </div>
      </div>
      
      <div className="p-2 flex justify-end">
        <button 
          onClick={toggleHistory}
          className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>
    </div>
  );
};

export default Calculator;