import React, { useEffect } from 'react';

const WarningFilter = ({ children }) => {
  useEffect(() => {
    const originalConsoleError = console.warn;

    const filterWarnings = (...args) => {
      const message = args[0] || '';
      if (message.includes('MUI: You have provided an out-of-range value')) {
        return;
      }
      originalConsoleError(...args);
    };

    console.warn= filterWarnings;

    return () => {
      console.warn = originalConsoleError;
    };
  }, []);

  return <>{children}</>;
};

export default WarningFilter;
