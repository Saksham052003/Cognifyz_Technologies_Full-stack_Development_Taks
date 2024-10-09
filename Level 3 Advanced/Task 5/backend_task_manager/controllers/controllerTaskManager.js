const taskmanager= require('../models/moduleTaskManager');
const mongoose= require('mongoose');

//return all the tasks 
const getTasks=async(req, res)=>{
    try{
        const user_id = req.user._id
        const tasks = await taskmanager.find({user_id}).sort({createdAt: -1});
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message: 'Failed to retrive tasks'});
    }
};
// return the perticular selected tasks 
const getTask= async(req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid task Id'});
    }
    try{
        const task= await taskmanager.findById(id);
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({message: 'Failed to retieve task'});
    }
};
//create the task
const createTask= async(req, res)=>{
    const {taskname, completed, priority } = req.body;

    let emptyFields = []

    if(!taskname){
        emptyFields.push('taskname')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(emptyFields.length >0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }
    try{
        const user_id = req.user._id
        const newTask= await taskmanager.create({ taskname, completed, priority, user_id});
        res.status(201).json(newTask);
    }catch (error){
        res.status(400).json({message: error.message});
    }
};
//delete the perticular task 
const deleteTask= async(req, res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid task Id'});
    }

    try{
        const deletedTask= await taskmanager.findByIdAndDelete({_id:id});
        if(!deletedTask){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(deletedTask,{message: 'Task Deleted'});
    } catch(error){
        res.status(500).json({message: 'Failed to delete task'});
    }
};
// update a task
const updateTask= async(req, res)=>{
    const { id } = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid task Id'});
    }

    const task= await taskmanager.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!task){
        return res.status(404).json({message: 'Task not found'});
    };

    res.status(200).json(task);

};

module.exports= {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}