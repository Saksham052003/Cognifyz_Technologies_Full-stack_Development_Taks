
const mongoose= require('mongoose')

const Schema=mongoose.Schema

const TaskManagerSchema=new Schema({
    taskname: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        enum: ['completed','not completed']
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high']
    }
    ,
    user_id:{
        type: String,
        required: true
    }
},{timestamps:true})

module.exports=mongoose.model('tasks',TaskManagerSchema)
