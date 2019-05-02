const express = require('express');
const app = express();
let port = 31337;

app.listen(port, () => {
    console.log(`app is running on port: ${port}`)
});