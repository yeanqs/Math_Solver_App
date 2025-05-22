import React from 'react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-4 px-6 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500 shadow-sm'} transition-colors duration-300`}>
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-sm">
        <p>© {new Date().getFullYear()} MathSolver App. All rights reserved.</p>
        <div className="mt-2 sm:mt-0 flex space-x-4">
          <a 
            href="#" 
            className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}
          >
            Terms
          </a>
          <a 
            href="#" 
            className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}
          >
            Privacy
          </a>
          <a 
            href="#" 
            className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors`}
          >
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;