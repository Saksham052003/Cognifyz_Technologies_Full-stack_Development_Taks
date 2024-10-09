// routes/todos.js
const express = require('express');
const { getTodolist, postTodo, deleteTodoItem } = require('../controllers/todocontrollers');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth);

router.get('/', getTodolist);
router.post('/', postTodo);
router.delete('/:id', deleteTodoItem);

module.exports = router;
