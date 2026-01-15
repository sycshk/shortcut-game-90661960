const express = require('express');
const path = require('path');
const cors = require('cors');

// Initialize database (creates tables if needed)
require('./database');

// Import routes
const leaderboardRoutes = require('./routes/leaderboard');
const usersRoutes = require('./routes/users');
const sessionsRoutes = require('./routes/sessions');
const historyRoutes = require('./routes/history');
const dailyRoutes = require('./routes/daily');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/daily', dailyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from the dist directory
const distPath = process.env.NODE_ENV === 'production'
  ? '/opt/shortcut-game/dist'
  : path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${distPath}`);
});
