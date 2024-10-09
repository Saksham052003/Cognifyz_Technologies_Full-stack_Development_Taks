const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv= require('dotenv');

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () =>{
            console.log('Conect to DataBase and listen on port ',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })