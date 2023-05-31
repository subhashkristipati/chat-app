import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="theme-switcher">
            <button onClick={toggleTheme} className='send-button'>Toggle Theme</button>
        </div>
    );
};

export default ThemeSwitcher;
