// models/todoModel.js
const fs = require('fs');
const todoFilePath = './data.json';

const readData = () => {
    const data = fs.readFileSync(todoFilePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(todoFilePath, JSON.stringify(data, null, 2));
};

const getTodos = (userEmail) => {
    const data = readData();
    return data.todos.filter(todo => todo.userEmail === userEmail);
};

const addTodo = (userEmail, text) => {
    const data = readData();
    const newTodo = { id: Date.now().toString(), text, userEmail, createdAt: new Date() };
    data.todos.push(newTodo);
    writeData(data);
    return newTodo;
};

const deleteTodo = (userEmail, id) => {
    const data = readData();
    const updatedTodos = data.todos.filter(todo => todo.id !== id || todo.userEmail !== userEmail);
    data.todos = updatedTodos;
    writeData(data);
    return updatedTodos;
};

module.exports = { getTodos, addTodo, deleteTodo };
