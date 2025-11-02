const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const feeRoutes = require('./routes/fees');

dotenv.config(); // Load .env variables

const app = express();

// CORS setup: allow Netlify frontend
app.use(cors({
  origin: 'https://asrv.netlify.app', // Replace with actual Netlify URL
  credentials: true
}));

app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/fees', feeRoutes);

// Root route for browser confirmation
app.get('/', (req, res) => {
  res.send('✅ Fee Finance Backend is running');
});

// Optional: catch-all error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));