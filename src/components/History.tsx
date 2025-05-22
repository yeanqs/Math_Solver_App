import React from 'react';

interface HistoryProps {
  items: Array<{ expression: string; result: string }>;
  onSelect: (item: { expression: string; result: string }) => void;
  darkMode: boolean;
}

const History: React.FC<HistoryProps> = ({ items, onSelect, darkMode }) => {
  if (items.length === 0) {
    return (
      <div className={`p-4 h-full flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
        <p>No calculation history yet</p>
      </div>
    );
  }

  return (
    <div className={`h-80 overflow-y-auto ${darkMode ? 'bg-gray-800 scrollbar-dark' : 'bg-white scrollbar-light'}`}>
      <h3 className={`p-3 text-sm font-medium ${darkMode ? 'text-gray-300 border-b border-gray-700' : 'text-gray-600 border-b border-gray-200'}`}>
        Calculation History
      </h3>
      <ul>
        {items.map((item, index) => (
          <li 
            key={index}
            onClick={() => onSelect(item)}
            className={`p-3 cursor-pointer border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
          >
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
              {item.expression}
            </div>
            <div className={`text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
              = {item.result}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;