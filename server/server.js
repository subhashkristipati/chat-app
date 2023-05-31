const express = require('express');
const app = express();
// const server = require('http').createServer(app);
const http = require('http').Server(app);
// const io = require('socket.io')(server);
const fs = require('fs');
const cors = require('cors')

const PORT = process.env.PORT || 3001;

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

io.on('connection', (socket) => {
    console.log('User connected');

    // Load messages from data.json
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
        } else {
            try {
                const messages = JSON.parse(data);
                messages.forEach((message) => {
                    socket.emit('message', message);
                });
            } catch (err) {
                console.error('Error parsing data.json:', err);
            }
        }
    });

    // Listen for new messages
    socket.on('message', (message) => {
        console.log('Message received:', message);

        // Save message to data.json
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data.json:', err);
            } else {
                try {
                    const messages = JSON.parse(data);
                    messages.push(message);
                    fs.writeFile('data.json', JSON.stringify(messages), (err) => {
                        if (err) {
                            console.error('Error writing to data.json:', err);
                        } else {
                            console.log('Message saved to data.json');
                        }
                    });
                } catch (err) {
                    console.error('Error parsing data.json:', err);
                }
            }
        });

        // Broadcast message to all connected clients
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

