require('dotenv').config();
const express = require('express');
const cors = require('cors');
const assetsRouter = require('./routes/assets');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assets', assetsRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ShareIndia API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`ShareIndia backend running on port ${PORT}`);
});
