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

// Debug endpoint - provides detailed server/database diagnostics
app.get('/debug', (req, res) => {
  try {
    const db = require('./database.cjs');
    const fs = require('fs');
    const dataDir = process.env.NODE_ENV === 'production' 
      ? '/opt/shortcut-game/data' 
      : require('path').join(__dirname, 'data');
    const dbPath = require('path').join(dataDir, 'game.db');
    
    // Get table counts
    const tables = {};
    const tableNames = ['users', 'leaderboard', 'sessions', 'answer_history', 'daily_challenges', 'daily_streaks'];
    for (const table of tableNames) {
      try {
        const result = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
        tables[table] = result.count;
      } catch (e) {
        tables[table] = `error: ${e.message}`;
      }
    }
    
    // Get database file info
    let dbInfo = { exists: false, size: 0 };
    try {
      const stats = fs.statSync(dbPath);
      dbInfo = {
        exists: true,
        size: stats.size,
        sizeFormatted: `${(stats.size / 1024).toFixed(2)} KB`,
        modified: stats.mtime.toISOString()
      };
    } catch (e) {
      dbInfo.error = e.message;
    }
    
    res.json({
      status: 'ok',
      server: {
        nodeVersion: process.version,
        uptime: process.uptime(),
        uptimeFormatted: `${Math.floor(process.uptime() / 60)} minutes`,
        memoryUsage: process.memoryUsage().heapUsed,
        env: process.env.NODE_ENV || 'development'
      },
      database: {
        path: dbPath,
        ...dbInfo,
        tables
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
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
