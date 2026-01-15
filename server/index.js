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

// Debug endpoint - provides detailed server/database diagnostics
app.get('/api/debug', (req, res) => {
  try {
    const db = require('./database');
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
