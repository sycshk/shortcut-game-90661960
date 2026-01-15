#!/bin/bash

# ============================================
# Shortcut Game - Debian Deployment Script
# Repository: sycshk/shortcut-game-90661960
# 
# Architecture:
#   Frontend: game.elufasys.com (Lovable preview or static)
#   Backend:  api.game.elufasys.com → localhost:3001
# ============================================

set -e

# Script location (helps avoid running an outdated copy)
SCRIPT_PATH="$(readlink -f "$0" 2>/dev/null || realpath "$0")"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"

# Configuration
REPO_URL="https://github.com/sycshk/shortcut-game-90661960.git"
INSTALL_DIR="/opt/shortcut-game"
SQLITE_DATA_DIR="/opt/shortcut-game/data"
BACKUP_DIR="/opt/shortcut-game-backups"
SERVICE_NAME="shortcut-game"
PORT=3001

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root"
    exit 1
fi

# Install dependencies if not present
install_dependencies() {
    log_info "Checking and installing dependencies..."
    
    apt-get update -qq
    
    # Install Node.js if not present
    if ! command -v node &> /dev/null; then
        log_info "Installing Node.js 20.x..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
    fi
    
    # Install git if not present
    if ! command -v git &> /dev/null; then
        log_info "Installing git..."
        apt-get install -y git
    fi
    
    # Install build tools for native modules (better-sqlite3)
    log_info "Installing build essentials for native modules..."
    apt-get install -y build-essential python3
    
    log_info "Dependencies ready"
}

# Backup SQLite database
backup_data() {
    log_info "========================================"
    log_info "BACKING UP DATABASE"
    log_info "========================================"
    
    mkdir -p "$BACKUP_DIR"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_PATH="$BACKUP_DIR/backup_$TIMESTAMP"
    
    if [ -f "$SQLITE_DATA_DIR/game.db" ]; then
        mkdir -p "$BACKUP_PATH"
        cp "$SQLITE_DATA_DIR/game.db" "$BACKUP_PATH/game.db"
        log_info "Database backed up to: $BACKUP_PATH/game.db"
        echo "$BACKUP_PATH" > "$BACKUP_DIR/.latest"
    else
        log_warn "No existing database found, skipping backup"
    fi
    
    # Clean old backups (keep last 10)
    cd "$BACKUP_DIR"
    ls -dt backup_* 2>/dev/null | tail -n +11 | xargs -r rm -rf
    log_info "Old backups cleaned (keeping last 10)"
}

# Stop existing service
stop_service() {
    if systemctl is-active --quiet $SERVICE_NAME 2>/dev/null; then
        log_info "Stopping existing service..."
        systemctl stop $SERVICE_NAME
    fi
}

# Update repository
update_repository() {
    log_info "========================================"
    log_info "UPDATING REPOSITORY"
    log_info "========================================"
    
    if [ -d "$INSTALL_DIR/.git" ]; then
        cd "$INSTALL_DIR"
        log_info "Fetching latest changes..."
        git fetch origin
        git reset --hard origin/main
        log_info "Repository updated"
    else
        # Fresh clone if not exists
        log_info "Cloning repository..."
        rm -rf "$INSTALL_DIR"
        git clone "$REPO_URL" "$INSTALL_DIR"
        log_info "Repository cloned"
    fi
    
    cd "$INSTALL_DIR"

    # Self-update: copy latest update.sh to /opt if running from there
    if [ "$SCRIPT_PATH" != "$INSTALL_DIR/update.sh" ] && [ -f "$INSTALL_DIR/update.sh" ]; then
        cp -f "$INSTALL_DIR/update.sh" "$SCRIPT_PATH" \
          && log_info "Updated deployment script at: $SCRIPT_PATH" \
          || log_warn "Could not self-update script at: $SCRIPT_PATH"
    fi
}

# Build the application
build_app() {
    log_info "========================================"
    log_info "INSTALLING DEPENDENCIES"
    log_info "========================================"
    
    cd "$INSTALL_DIR"
    
    # Install dependencies
    log_info "Installing npm dependencies..."
    npm install
    
    log_info "Dependencies installed"
}

# Restore database from backup if needed
restore_data() {
    log_info "========================================"
    log_info "RESTORING DATABASE"
    log_info "========================================"
    
    mkdir -p "$SQLITE_DATA_DIR"
    
    # If database doesn't exist, try to restore from backup
    if [ ! -f "$SQLITE_DATA_DIR/game.db" ]; then
        if [ -f "$BACKUP_DIR/.latest" ]; then
            LATEST_BACKUP=$(cat "$BACKUP_DIR/.latest")
        else
            LATEST_BACKUP=$(ls -td "$BACKUP_DIR"/backup_* 2>/dev/null | head -1)
        fi
        
        if [ -n "$LATEST_BACKUP" ] && [ -f "$LATEST_BACKUP/game.db" ]; then
            cp "$LATEST_BACKUP/game.db" "$SQLITE_DATA_DIR/game.db"
            log_info "Database restored from: $LATEST_BACKUP"
        else
            log_info "No backup found, fresh database will be created on first run"
        fi
    else
        log_info "Database already exists"
    fi
}

# Create/update systemd service
create_service() {
    log_info "Creating systemd service on port $PORT..."
    
    cat > /etc/systemd/system/$SERVICE_NAME.service << EOF
[Unit]
Description=Shortcut Game API Server (Express + SQLite)
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$INSTALL_DIR
ExecStart=/usr/bin/node $INSTALL_DIR/server/index.cjs
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=$PORT

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable $SERVICE_NAME
    log_info "Service configured on port $PORT"
}

# Start the service
start_service() {
    log_info "Starting service..."

    systemctl restart $SERVICE_NAME
    
    sleep 3
    
    if systemctl is-active --quiet $SERVICE_NAME; then
        log_info "Service started successfully on port $PORT"
    else
        log_error "Service failed to start!"
        journalctl -u $SERVICE_NAME --no-pager -n 20
        exit 1
    fi
}

# Verify deployment
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check if port is listening
    if command -v ss &> /dev/null; then
        if ss -tlnp | grep -q ":$PORT"; then
            log_info "Port $PORT is listening"
        else
            log_warn "Port $PORT not detected, checking again..."
            sleep 2
        fi
    fi
    
    # Test health endpoint
    if command -v curl &> /dev/null; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/health 2>/dev/null || echo "000")
        if [ "$HTTP_CODE" = "200" ]; then
            log_info "Health check passed (HTTP 200)"
        else
            log_warn "Health check returned HTTP $HTTP_CODE"
        fi
    fi
    
    # Check database
    if [ -f "$SQLITE_DATA_DIR/game.db" ]; then
        DB_SIZE=$(du -h "$SQLITE_DATA_DIR/game.db" | cut -f1)
        log_info "Database exists: $SQLITE_DATA_DIR/game.db ($DB_SIZE)"
    else
        log_warn "Database file not found (will be created on first request)"
    fi
}

# Main deployment flow
main() {
    echo ""
    log_info "========================================"
    log_info "SHORTCUT GAME API DEPLOYMENT"
    log_info "$(date)"
    log_info "========================================"
    echo ""
    
    install_dependencies
    backup_data
    stop_service
    update_repository
    build_app
    restore_data
    create_service
    start_service
    verify_deployment
    
    echo ""
    log_info "========================================"
    log_info "DEPLOYMENT COMPLETE!"
    log_info "========================================"
    log_info "API URL: http://localhost:$PORT"
    log_info "Health:  curl http://localhost:$PORT/health"
    log_info "Database: $SQLITE_DATA_DIR/game.db"
    log_info "Backups: $BACKUP_DIR"
    log_info "========================================"
    echo ""
    log_info "OPNsense Caddy config:"
    log_info "  api.game.elufasys.com → your-server-ip:$PORT"
    echo ""
}

# Run main
main "$@"
