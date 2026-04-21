const cors = require("cors");
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://final-hackatton.vercel.app",
  credentials: true
}));

app.use(express.json());

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: "Backend running" });
});

module.exports = app;