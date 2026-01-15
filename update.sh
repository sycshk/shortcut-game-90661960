#!/bin/bash

# ============================================
# Shortcut Game - Debian Deployment Script
# Repository: sycshk/shortcut-game-90661960
# Install Path: /opt/shortcut-game
# ============================================

set -e

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
NC='\033[0m' # No Color

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
    
    # Update package list
    apt-get update -qq
    
    # Install Node.js if not present
    if ! command -v node &> /dev/null; then
        log_info "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
    fi
    
    # Install git if not present
    if ! command -v git &> /dev/null; then
        log_info "Installing git..."
        apt-get install -y git
    fi
    
    # Install nginx if not present (optional, for reverse proxy)
    if ! command -v nginx &> /dev/null; then
        log_info "Installing nginx..."
        apt-get install -y nginx
    fi
    
    log_info "Dependencies installed successfully"
}

# Backup existing data files
backup_data() {
    if [ -d "$DATA_DIR" ]; then
        log_info "Backing up existing data..."
        mkdir -p "$BACKUP_DIR"
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        cp -r "$DATA_DIR" "$BACKUP_DIR/data_$TIMESTAMP"
        log_info "Data backed up to $BACKUP_DIR/data_$TIMESTAMP"
    fi
}

# Restore data files after deployment
restore_data() {
    if [ -d "$BACKUP_DIR" ]; then
        # Get the most recent backup
        LATEST_BACKUP=$(ls -td "$BACKUP_DIR"/data_* 2>/dev/null | head -1)
        if [ -n "$LATEST_BACKUP" ] && [ -d "$LATEST_BACKUP" ]; then
            log_info "Restoring data from backup..."
            mkdir -p "$DATA_DIR"
            
            # Restore each data file if it exists in backup
            for file in leaderboard.json profiles.json sessions.json history.json; do
                if [ -f "$LATEST_BACKUP/$file" ]; then
                    cp "$LATEST_BACKUP/$file" "$DATA_DIR/$file"
                    log_info "Restored $file"
                fi
            done
        fi
    fi
}

# Clone or update repository
update_repository() {
    if [ -d "$INSTALL_DIR/.git" ]; then
        log_info "Updating existing repository..."
        cd "$INSTALL_DIR"
        git fetch origin
        git reset --hard origin/main
    else
        log_info "Cloning repository..."
        rm -rf "$INSTALL_DIR"
        git clone "$REPO_URL" "$INSTALL_DIR"
        cd "$INSTALL_DIR"
    fi
}

# Build the application
build_app() {
    log_info "Installing npm dependencies..."
    cd "$INSTALL_DIR"
    npm install
    
    log_info "Building application..."
    npm run build
    
    # Ensure data directory exists in dist
    mkdir -p "$DATA_DIR"
    
    # Initialize data files if they don't exist
    for file in leaderboard.json profiles.json sessions.json history.json; do
        if [ ! -f "$DATA_DIR/$file" ]; then
            case $file in
                "leaderboard.json")
                    echo '{"entries":[],"lastUpdated":null}' > "$DATA_DIR/$file"
                    ;;
                "profiles.json")
                    echo '{"profiles":{},"lastUpdated":null}' > "$DATA_DIR/$file"
                    ;;
                "sessions.json")
                    echo '{"sessions":[],"lastUpdated":null}' > "$DATA_DIR/$file"
                    ;;
                "history.json")
                    echo '{"records":[],"lastUpdated":null}' > "$DATA_DIR/$file"
                    ;;
            esac
            log_info "Created $file"
        fi
    done
    
    # Set proper permissions
    chmod -R 755 "$DATA_DIR"
}

# Create systemd service for serving the app
create_service() {
    log_info "Creating systemd service..."
    
    cat > /etc/systemd/system/$SERVICE_NAME.service << EOF
[Unit]
Description=Shortcut Game Static Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$INSTALL_DIR/dist
ExecStart=/usr/bin/npx serve -s . -l $PORT
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

    # Install serve globally if not present
    if ! command -v serve &> /dev/null; then
        npm install -g serve
    fi

    systemctl daemon-reload
    systemctl enable $SERVICE_NAME
    log_info "Service created and enabled"
}

# Configure nginx as reverse proxy (optional)
configure_nginx() {
    log_info "Configuring nginx..."
    
    cat > /etc/nginx/sites-available/$SERVICE_NAME << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Enable write access to data files via POST (optional API endpoint)
    location /data/ {
        alias $DATA_DIR/;
        autoindex off;
        
        # Allow reading JSON files
        add_header Content-Type application/json;
    }
}
EOF

    # Enable the site
    ln -sf /etc/nginx/sites-available/$SERVICE_NAME /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    # Test and reload nginx
    nginx -t && systemctl reload nginx
    log_info "Nginx configured"
}

# Start/restart the service
restart_service() {
    log_info "Starting service..."
    systemctl restart $SERVICE_NAME
    
    # Wait a moment and check status
    sleep 2
    if systemctl is-active --quiet $SERVICE_NAME; then
        log_info "Service started successfully on port $PORT"
    else
        log_error "Service failed to start. Check logs with: journalctl -u $SERVICE_NAME"
        exit 1
    fi
}

# Sync localStorage export data back to JSON files (run via cron or manually)
sync_data() {
    log_info "Data files are synced from browser localStorage to server."
    log_info "To sync data, copy the exported JSON from browser localStorage keys:"
    log_info "  - shortcut-export-leaderboard -> $DATA_DIR/leaderboard.json"
    log_info "  - shortcut-export-profiles -> $DATA_DIR/profiles.json"
    log_info "  - shortcut-export-sessions -> $DATA_DIR/sessions.json"
    log_info "  - shortcut-export-history -> $DATA_DIR/history.json"
}

# Main deployment flow
main() {
    log_info "========================================"
    log_info "Shortcut Game Deployment Script"
    log_info "========================================"
    
    install_dependencies
    backup_data
    update_repository
    build_app
    restore_data
    create_service
    configure_nginx
    restart_service
    
    log_info "========================================"
    log_info "Deployment complete!"
    log_info "Application available at: http://localhost:$PORT"
    log_info "Data directory: $DATA_DIR"
    log_info "========================================"
    
    sync_data
}

# Run main function
main "$@"
