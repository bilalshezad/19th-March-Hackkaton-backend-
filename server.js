const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:5173', // Local React (Vite)
        'https://final-hackatton.vercel.app', // Explicit Production Frontend without slash
        process.env.FRONTEND_URL  // Env variable fallback
    ],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
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
