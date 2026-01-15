#!/bin/bash

# ============================================
# Shortcut Game - Debian Deployment Script
# Repository: sycshk/shortcut-game-90661960
# Install Path: /opt/shortcut-game
# Port: 3000 (Caddy reverse proxy on 443)
# ============================================

set -e

# Script location (helps avoid running an outdated copy)
SCRIPT_PATH="$(readlink -f "$0" 2>/dev/null || realpath "$0")"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"

# Configuration
REPO_URL="https://github.com/sycshk/shortcut-game-90661960.git"
INSTALL_DIR="/opt/shortcut-game"
DATA_DIR="$INSTALL_DIR/dist/data"
BACKUP_DIR="/opt/shortcut-game-backups"
SERVICE_NAME="shortcut-game"
PORT=3000

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
    
# Install build tools for native modules
    log_info "Installing build essentials for native modules..."
    apt-get install -y build-essential python3
    
    log_info "Dependencies ready"
}

# Backup existing data files (ALWAYS runs before update)
backup_data() {
    log_info "========================================"
    log_info "BACKING UP DATA"
    log_info "========================================"
    
    mkdir -p "$BACKUP_DIR"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_PATH="$BACKUP_DIR/data_$TIMESTAMP"
    
    if [ -d "$DATA_DIR" ]; then
        mkdir -p "$BACKUP_PATH"
        
        for file in leaderboard.json profiles.json sessions.json history.json; do
            if [ -f "$DATA_DIR/$file" ]; then
                cp "$DATA_DIR/$file" "$BACKUP_PATH/$file"
                log_info "Backed up: $file"
            fi
        done
        
        log_info "Data backed up to: $BACKUP_PATH"
        echo "$BACKUP_PATH" > "$BACKUP_DIR/.latest"
    else
        log_warn "No existing data directory found, skipping backup"
    fi
    
    # Clean old backups (keep last 10)
    cd "$BACKUP_DIR"
    ls -dt data_* 2>/dev/null | tail -n +11 | xargs -r rm -rf
    log_info "Old backups cleaned (keeping last 10)"
}

# Stop existing service
stop_service() {
    if systemctl is-active --quiet $SERVICE_NAME 2>/dev/null; then
        log_info "Stopping existing service..."
        systemctl stop $SERVICE_NAME
    fi
}

# Full force update - remove and re-clone
force_update_repository() {
    log_info "========================================"
    log_info "FORCE UPDATE - FULL REBUILD"
    log_info "========================================"
    
    # Remove existing installation completely
    if [ -d "$INSTALL_DIR" ]; then
        log_info "Removing existing installation..."
        rm -rf "$INSTALL_DIR"
    fi
    
    # Fresh clone
    log_info "Cloning repository..."
    git clone "$REPO_URL" "$INSTALL_DIR"
    cd "$INSTALL_DIR"

    # If this script is being run from outside the repo (common: /opt/update.sh),
    # overwrite that copy so the NEXT run uses the latest version.
    if [ "$SCRIPT_PATH" != "$INSTALL_DIR/update.sh" ] && [ -f "$INSTALL_DIR/update.sh" ]; then
        cp -f "$INSTALL_DIR/update.sh" "$SCRIPT_PATH" \
          && log_info "Updated deployment script at: $SCRIPT_PATH" \
          || log_warn "Could not self-update script at: $SCRIPT_PATH"
    fi
    
    log_info "Repository cloned successfully"
}

# Build the application from scratch
build_app() {
    log_info "========================================"
    log_info "BUILDING APPLICATION"
    log_info "========================================"
    
    cd "$INSTALL_DIR"
    
    # Clean install dependencies
    log_info "Installing npm dependencies (clean)..."
    rm -rf node_modules package-lock.json
    npm install
    
    # Build
    log_info "Building application..."
    npm run build
    
    # Ensure data directory exists
    mkdir -p "$DATA_DIR"
    
    log_info "Build complete"
}

# Initialize empty data files if they don't exist
init_data_files() {
    mkdir -p "$DATA_DIR"
    
    [ ! -f "$DATA_DIR/leaderboard.json" ] && echo '{"entries":[],"lastUpdated":null}' > "$DATA_DIR/leaderboard.json"
    [ ! -f "$DATA_DIR/profiles.json" ] && echo '{"profiles":{},"lastUpdated":null}' > "$DATA_DIR/profiles.json"
    [ ! -f "$DATA_DIR/sessions.json" ] && echo '{"sessions":[],"lastUpdated":null}' > "$DATA_DIR/sessions.json"
    [ ! -f "$DATA_DIR/history.json" ] && echo '{"records":[],"lastUpdated":null}' > "$DATA_DIR/history.json"
    
    chmod -R 755 "$DATA_DIR"
}

# Restore data from the latest backup
restore_data() {
    log_info "========================================"
    log_info "RESTORING DATA FROM BACKUP"
    log_info "========================================"
    
    # Get latest backup path
    if [ -f "$BACKUP_DIR/.latest" ]; then
        LATEST_BACKUP=$(cat "$BACKUP_DIR/.latest")
    else
        LATEST_BACKUP=$(ls -td "$BACKUP_DIR"/data_* 2>/dev/null | head -1)
    fi
    
    if [ -n "$LATEST_BACKUP" ] && [ -d "$LATEST_BACKUP" ]; then
        mkdir -p "$DATA_DIR"
        
        for file in leaderboard.json profiles.json sessions.json history.json; do
            if [ -f "$LATEST_BACKUP/$file" ]; then
                cp "$LATEST_BACKUP/$file" "$DATA_DIR/$file"
                log_info "Restored: $file"
            fi
        done
        
        chmod -R 755 "$DATA_DIR"
        log_info "Data restored from: $LATEST_BACKUP"
    else
        log_warn "No backup found, initializing empty data files"
        init_data_files
    fi
}

# Migrate JSON data to SQLite (first-time only)
migrate_data_to_sqlite() {
    log_info "========================================"
    log_info "MIGRATING DATA TO SQLITE"
    log_info "========================================"
    
    SQLITE_DATA_DIR="$INSTALL_DIR/data"
    mkdir -p "$SQLITE_DATA_DIR"
    
    if [ ! -f "$SQLITE_DATA_DIR/game.db" ]; then
        log_info "No SQLite database found, running migration..."
        cd "$INSTALL_DIR"
        node server/migrate-json.cjs || log_warn "Migration script failed or no data to migrate"
        log_info "Migration complete"
    else
        log_info "SQLite database already exists, skipping migration"
    fi
}

# Create/update systemd service
create_service() {
    log_info "Creating systemd service on port $PORT..."
    
    cat > /etc/systemd/system/$SERVICE_NAME.service << EOF
[Unit]
Description=Shortcut Game Express + SQLite Server
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
    log_info "Service configured on port $PORT (Express + SQLite)"
}

# Start the service
start_service() {
    log_info "Starting service..."

    # Use restart to ensure systemd picks up the latest unit changes
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
    
    # Check data files
    for file in leaderboard.json profiles.json sessions.json history.json; do
        if [ -f "$DATA_DIR/$file" ]; then
            log_info "Data file exists: $file"
        else
            log_error "Missing data file: $file"
        fi
    done
}

# Print Caddy configuration hint
print_caddy_hint() {
    echo ""
    log_info "========================================"
    log_info "CADDY CONFIGURATION"
    log_info "========================================"
    echo ""
    echo "Add this to your Caddyfile:"
    echo ""
    echo "yourdomain.com {"
    echo "    reverse_proxy localhost:$PORT"
    echo "}"
    echo ""
    log_info "Caddy will handle SSL on port 443 automatically"
}

# Main deployment flow
main() {
    echo ""
    log_info "========================================"
    log_info "SHORTCUT GAME DEPLOYMENT"
    log_info "$(date)"
    log_info "========================================"
    echo ""
    
    install_dependencies
    backup_data
    stop_service
    force_update_repository
    build_app
    restore_data
    migrate_data_to_sqlite
    create_service
    start_service
    verify_deployment
    
    echo ""
    log_info "========================================"
    log_info "DEPLOYMENT COMPLETE!"
    log_info "========================================"
    log_info "App URL: http://localhost:$PORT"
    log_info "Data dir: $DATA_DIR"
    log_info "Backups: $BACKUP_DIR"
    log_info "========================================"
    
    print_caddy_hint
}

# Run main
main "$@"
