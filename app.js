require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const routes = require('./routes')
const port = process.env.EXPRESS_PORT || 8080;
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use("/api", express.urlencoded({ extended: false }), routes);

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
});