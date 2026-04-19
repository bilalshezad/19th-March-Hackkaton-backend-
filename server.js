const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');

dotenv.config();
connectDB();
const corsOptions = {
    origin: [
        'http://localhost:5173', // Local React (Vite)
        process.env.FRONTEND_URL  // Production Frontend
    ],
    credentials: true,
};

app.use(cors(corsOptions));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://final-hackatton.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 5000;

// Root route for Vercel verify
app.get('/', (req, res) => {
    res.json({ message: "Helplytics AI Backend is running on Vercel" });
});

module.exports = app;
