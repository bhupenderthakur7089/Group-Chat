const http = require('http');
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const route1 = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/home',route1);
app.use((req, res) => {
    res.status(404).send('<h1>Page Not found</h1>')
})
app.listen(4000);