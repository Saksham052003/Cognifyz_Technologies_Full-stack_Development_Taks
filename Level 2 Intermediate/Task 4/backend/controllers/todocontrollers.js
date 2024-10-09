// controllers/todoController.js
const { getTodos, addTodo, deleteTodo } = require('../models/todoModel');

const getTodolist = async (req, res) => {
    const userEmail = req.user.email;
    const todos = getTodos(userEmail);
    res.json(todos);
};

const postTodo = async (req, res) => {
    const userEmail = req.user.email;
    const { text } = req.body;
    const newTodo = addTodo(userEmail, text);
    res.status(201).json(newTodo);
};

const deleteTodoItem = async (req, res) => {
    const userEmail = req.user.email;
    const { id } = req.params;
    const updatedTodos = deleteTodo(userEmail, id);
    res.status(204).json(updatedTodos);
};

module.exports = { getTodolist, postTodo, deleteTodoItem };
