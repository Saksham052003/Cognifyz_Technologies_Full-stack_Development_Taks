const express = require('express');
const fs= require('fs');
const router= express.Router();

const getTodos = () =>{
    const data= fs.readFileSync('data.json');
    return JSON.parse(data);
};

const saveTodos= (todos) =>{
    fs.writeFileSync('data.json', JSON.stringify(todos, null, 2));
};

router.get('/', (req, res) =>{
    const todos = getTodos();
    res.json(todos);
});

router.post('/', (req, res) =>{
    const todos = getTodos();
    const newTodo = req.body;
    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
});

router.delete('/:id', (req, res) =>{
    const todos = getTodos();
    const id = req.params.id;
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
    res.status(204).end();
});

module.exports = router;
