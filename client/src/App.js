import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { ThemeContext } from './components/ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="App">
      <ThemeContext.Provider value={[theme, setTheme]}>
        <Sidebar />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
