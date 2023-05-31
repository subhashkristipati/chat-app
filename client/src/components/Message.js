import React from 'react';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { docco, dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// const Message = ({ message, theme }) => {
//     const isCode = message.startsWith('```') && message.endsWith('```');
//     const code = message.slice(3, -3);

//     return (
//         <div className="message">
//             {isCode ? (<SyntaxHighlighter language="javascript" style={theme === 'light' ? docco : dark}> {code} </SyntaxHighlighter>) : (<p>{message}</p>)}
//         </div>
//     );
// };

const Message = ({ message }) => {
    const { username, text, timestamp } = message;

    return (
        <div className="message">
            <div className="username">{username}</div>
            <div className="message-content">
                <div className="text">{text}</div>
                <div className="timestamp">{new Date(timestamp).toLocaleString()}</div>
            </div>
        </div>
    );
};

export default Message;
