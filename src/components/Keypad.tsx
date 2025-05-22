import React from 'react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  darkMode: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress, darkMode }) => {
  const buttons = [
    ['C', '(', ')', '⌫'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  const getButtonClass = (button: string) => {
    let baseClass = `w-full h-14 flex items-center justify-center rounded-lg text-lg font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors active:scale-95 duration-150`;
    
    if (button === '=') {
      return `${baseClass} ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`;
    } else if (['÷', '×', '-', '+'].includes(button)) {
      return `${baseClass} ${darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-100 text-indigo-700'}`;
    } else if (['C', '(', ')', '⌫'].includes(button)) {
      return `${baseClass} ${darkMode ? 'bg-gray-700 text-amber-400' : 'bg-amber-100 text-amber-700'}`;
    } else {
      return `${baseClass} ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} ${darkMode ? 'shadow-inner shadow-gray-900' : 'shadow-sm'}`;
    }
  };

  const getButtonValue = (button: string) => {
    const buttonMap: Record<string, string> = {
      '×': '*',
      '÷': '/',
    };
    
    return buttonMap[button] || button;
  };

  return (
    <div className={`grid grid-cols-4 gap-2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
      {buttons.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {row.map((button) => (
            <button
              key={button}
              className={getButtonClass(button)}
              onClick={() => onKeyPress(getButtonValue(button))}
            >
              {button}
            </button>
          ))}
        </React.Fragment>
      ))}
      
      <div className="col-span-4 grid grid-cols-4 gap-2 mt-2">
        <button 
          className={`${getButtonClass('sin')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('sin(')}
        >
          sin
        </button>
        <button 
          className={`${getButtonClass('cos')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('cos(')}
        >
          cos
        </button>
        <button 
          className={`${getButtonClass('tan')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('tan(')}
        >
          tan
        </button>
        <button 
          className={`${getButtonClass('sqrt')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('sqrt(')}
        >
          √
        </button>
        
        <button 
          className={`${getButtonClass('log')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('log(')}
        >
          log
        </button>
        <button 
          className={`${getButtonClass('ln')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('ln(')}
        >
          ln
        </button>
        <button 
          className={`${getButtonClass('π')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('pi')}
        >
          π
        </button>
        <button 
          className={`${getButtonClass('e')} ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'}`}
          onClick={() => onKeyPress('e')}
        >
          e
        </button>
      </div>
    </div>
  );
};

export default Keypad;