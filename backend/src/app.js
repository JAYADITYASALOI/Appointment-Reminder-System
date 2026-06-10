const express = require('express');
const cors = require('cors');
const appointmentsRoutes = require('./routes/appointments.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
  });
});

app.use('/api/appointments', appointmentsRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

module.exports = app;