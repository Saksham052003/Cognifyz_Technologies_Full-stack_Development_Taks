const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const dotenv= require('dotenv')

dotenv.config();

const app= express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DataBase and listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB', error);
    });