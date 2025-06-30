require('dotenv').config();
console.log('JWT secret in memory 👉', process.env.JWT_TOKEN);
const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app=express();
const PORT=process.env.PORT || 4000;

connectDB();

app.use(cors({origin:['http://localhost:3000'], credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))