import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import io from 'socket.io-client';
import Message from './Message';

const socket = io.connect('http://localhost:3001');

const Chat = () => {
    const theme = useContext(ThemeContext);
    const [messages, setMessages] = useState([]);
    // const [input, setInput] = useState('');
    // const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('')

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => {
                if (prevMessages.some((m) => m.timestamp === message.timestamp)) {
                    return prevMessages;
                } else {
                    return [...prevMessages, message];
                }
            });
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== '' && username.trim() !== '') {
            const message = {
                text: inputValue.trim(),
                timestamp: new Date().toISOString(),
                theme: theme,
                username: username.trim(),
            };
            socket.emit('message', message);
            setInputValue('');
        }
    };

    return (
        <div className="chat">
            {/* {error && <div className="error">{error}</div>} */}
            <div className="messages">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            <form onSubmit={handleSubmit} className='message-form'>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    className='user-input'
                />
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message"
                    className='message-input'
                />
                <button type="submit" className='send-button'>Send</button>
            </form>
        </div>
    );
};

export default Chat;

