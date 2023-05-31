import React from 'react';
import Chat from './Chat';
import ThemeSwitcher from './ThemeSwitcher';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ThemeSwitcher />
            <Chat />
        </div>
    );
};

export default Sidebar;