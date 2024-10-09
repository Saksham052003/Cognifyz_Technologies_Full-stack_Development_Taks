const express= require('express');
const bodyParser = require('body-parser');
const fs= require('fs');
const cors= require('cors');

const app= express();
const port= 5000;

app.use(cors());
app.use(bodyParser.json());

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})
