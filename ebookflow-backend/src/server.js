const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/conversion', require('./routes/conversion.routes'));
app.use('/api/templates', require('./routes/template.routes'));
app.use('/api/ai', require('./routes/ai.routes'));

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'EbookFlow Pro Backend is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`EbookFlow Pro Backend server running on port ${PORT}`);
});

module.exports = app;