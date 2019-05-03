const express = require('express');
const app = express();
let port = 31337;
app.use(express.urlencoded({extended: true}));

// this is my 'database'
const db = [
    'Welcome to CHAppy!'
];

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

app.listen(port, () => {
    console.log(`app is running on port: ${port}`)
});