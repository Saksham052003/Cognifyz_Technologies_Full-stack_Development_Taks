const express=require('express')
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}= require('../controllers/controllerTaskManager');

const requireAuth= require('../middleware/requireAuth');
const router = express.Router();

// require auth for all workout 
router.use(requireAuth);

//to get all tasks 
router.get('/',getTasks);

//to get a single task
router.get('/:id',getTask);

//to create a now tsak
router.post('/',createTask);

//to delete a task
router.delete('/:id',deleteTask);

//to update a task
router.patch('/:id',updateTask);

module.exports= router;