const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app); // create a plain vanilla http server that uses our express app
let port = 31337;

const WebSocket = require('ws');
const wss = new WebSocket.Server({
    server, // piggybacking on the plain http server
    path: '/chat' // listen on only one route, allowing express to continue to listen on its custom routes
});


app.use(express.urlencoded({extended: true}));

// this is my 'database'
const db = [
    'Welcome to CHAppy!'
];

wss.on('connection', (socket) => {
    console.log('oh boy! a new connection')
    socket.send(JSON.stringify(db));

    socket.on('message', (data) => {
        console.log(data);
        db.push(data);
        console.log(db);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN){  // keeps server from erroring out if a user drops out
                client.send(JSON.stringify(data));
            }
        });
        // socket.send(data);
    });
});

// when GET request comes in, send back all the messages
app.get('/api', (req, res) => {
    res.json(db);
})

// when POST request comes in, add message to array of messages
app.post('/api', (req, res) => {
    console.log(req.body.message);
    // adds message to the database(db)
    db.push(req.body.message);
    // responds with json 
    res.json({
        'message': req.body.message
    })
})

server.listen(port, () => {
    console.log(`app is running on port: ${port}`)
});