const express = require('express');
const path = require('path');
const cors = require('cors');

// --- Process diagnostics (helps debug systemd restarts) ---
process.on('uncaughtException', (err) => {
  console.error('❌ uncaughtException:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('❌ unhandledRejection:', reason);
});
process.on('SIGTERM', () => {
  console.error('⚠️ SIGTERM received');
});
process.on('SIGINT', () => {
  console.error('⚠️ SIGINT received');
});
process.on('exit', (code) => {
  console.error('⚠️ process exit with code:', code);
});

// Initialize database (creates tables if needed)
require('./database.cjs');

// Import routes
const leaderboardRoutes = require('./routes/leaderboard.cjs');
const usersRoutes = require('./routes/users.cjs');
const sessionsRoutes = require('./routes/sessions.cjs');
const historyRoutes = require('./routes/history.cjs');
const dailyRoutes = require('./routes/daily.cjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://game.elufasys.com',
    /\.lovable\.app$/,
    /\.lovableproject\.com$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API routes (no /api prefix - dedicated subdomain)
app.use('/leaderboard', leaderboardRoutes);
app.use('/users', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/history', historyRoutes);
app.use('/daily', dailyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${distPath}`);
});

// Ensure we have a reference to keep the process alive
server.on('error', (err) => {
  console.error('❌ Server error:', err);
  // If we cannot bind to the port (common during deploys), exit non-zero so systemd reports a real failure.
  process.exit(1);
});

// Log when connections happen (debug)
server.on('connection', () => {
  console.log('📡 New connection');
});

console.log('✅ Server setup complete, event loop should stay active');
