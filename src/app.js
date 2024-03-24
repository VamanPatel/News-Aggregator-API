const express = require('express');
require('dotenv').config();
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const auth = require('./routes/auth');
const news = require('./routes/news');

/* ---------------------------------------------- middleware ---------------------------------------------- */
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));

/* ------------------------------------------------ routes ------------------------------------------------ */

app.use("/api/v1/auth", auth)
app.use("/api/v1/news", news)

/* --------------------------------------------- server start --------------------------------------------- */

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();