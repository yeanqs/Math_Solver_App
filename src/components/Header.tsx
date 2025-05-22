import React from 'react';
import { Calculator } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  return (
    <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'} transition-colors duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} size={24} />
          <h1 className="text-xl font-bold">MathSolver</h1>
        </div>
        
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a 
                href="#calculator" 
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Calculator
              </a>
            </li>
            <li>
              <a 
                href="#formulas" 
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Formulas
              </a>
            </li>
            <li>
              <a 
                href="#history" 
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                History
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;