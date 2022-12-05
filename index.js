const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require('./routes/main');
const { initSocketConnection } = require('./services/socket');
const { initDBConnection, clearSessionsData } = require('./services/db');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const PORT = 7000;

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log('Server running...');
});

const initServices = () => {
    initDBConnection();
    clearSessionsData();
    initSocketConnection();
}

initServices();