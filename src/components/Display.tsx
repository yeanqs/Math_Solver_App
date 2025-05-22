import React from 'react';

interface DisplayProps {
  input: string;
  result: string;
  error: string | null;
  darkMode: boolean;
}

const Display: React.FC<DisplayProps> = ({ input, result, error, darkMode }) => {
  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-indigo-50'} transition-colors duration-300`}>
      <div className="h-24 flex flex-col justify-between">
        <div className="text-right">
          <div className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} min-h-6 break-all`}>
            {input || '0'}
          </div>
        </div>
        
        <div className="text-right">
          {error ? (
            <div className="text-red-500 text-2xl font-semibold">{error}</div>
          ) : (
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} break-all`}>
              {result || '0'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Display;