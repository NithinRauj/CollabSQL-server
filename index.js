const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes/main');
const { initConnection } = require('./services/socket');

app.use(express.json());
app.use(cors());

const PORT = 7000;

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log('Server running...');
});

initConnection();