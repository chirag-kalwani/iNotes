const express = require('express');
const cors = require('cors')
const connectToMongo = require('./db');
connectToMongo();

const port = 5000;
const localHost = '127.0.0.1';
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded()); // use in case ==> fetch from form data;
// auth related endpoints
app.use('/api/auth', require('./routes/auth'));
// notes related endpoints
app.use('/api/notes', require('./routes/notes'));
// For serving static files
app.use('/static', express.static('static'));


app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(port, localHost, () => {
    console.log(`Your server start ar http://${localHost}:${port}`);
});