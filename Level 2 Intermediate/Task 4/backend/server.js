// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const todosRouter = require('./routes/todos');
const userRouter = require('./routes/user');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/todos', todosRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
