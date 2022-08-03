const express = require('express');
const cors = require('cors')
const connectToMongo = require('./db');
connectToMongo();

const port = 5000;
const localHost = '127.0.0.1';
const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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