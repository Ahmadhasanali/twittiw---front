require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes')
const port = process.env.EXPRESS_PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json())
app.use("/api", express.urlencoded({ extended: false }), routes);

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
});