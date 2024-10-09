require('dotenv').config();
const express= require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const routerTaskManage= require('./routes/routeTaskManager');
const routerUser= require('./routes/routeUser');

app.use(cors({
    origin: 'http://localhost:3000',  // Frontend origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
}));

app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next() 
})

app.use('/api/taskmanager',routerTaskManage);
app.use('/api/user',routerUser)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () =>{
            console.log(`Conect to DataBase and Server is running on http://localhost:4000`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
