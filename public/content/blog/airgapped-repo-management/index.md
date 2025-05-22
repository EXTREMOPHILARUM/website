---
title: "🔒 Surviving the Air Gap: Building Your Own Debian Repository Fortress"
tags: ["Linux", "Debian", "DevOps", "Security", "Infrastructure"]
description: "A comprehensive guide to creating self-sufficient Debian repositories for air-gapped environments using reprepro and apt-rdepends"
author: "Saurabh Nandedkar"
date: "2025-05-23"
---

# 🔒 Surviving the Air Gap: Building Your Own Debian Repository Fortress with Reprepro & apt-rdepends   

*Or: How I Learned to Stop Worrying and Love Offline Package Management*

Welcome to the wild world of air-gapped environments, where the internet is but a distant memory and `apt update` returns nothing but tears and broken dreams! 😭 If you've ever found yourself staring at a completely isolated network wondering how to get that critical security patch installed without carrier pigeons, this guide is your lifeline.

We're about to embark on an epic journey of creating a self-sufficient Debian repository using reprepro and apt-rdepends – think of it as building your own digital survival bunker, but for packages! 🏰

## 🌟 Meet Your New Best Friends

### Reprepro: The Repository Wizard 🧙‍♂️

Reprepro is like having a magical librarian who not only organizes all your books (packages) but also knows exactly which book you need before you even ask. Unlike that dusty old file server approach, reprepro gives you:

- ✨ Proper repository metadata (because chaos is not a feature)
- 🔐 Package signing (trust, but verify!)
- 🎯 Sophisticated filtering (only the good stuff gets through)
- 🏗️ Multi-architecture support (because diversity matters)

### apt-rdepends: The Dependency Detective 🕵️‍♀️

This little gem is your dependency bloodhound. It sniffs out every single package relationship, from the obvious to the "wait, THAT depends on WHAT?!" moments. In an air-gapped world, missing a dependency is like forgetting to pack water for a desert hike – potentially catastrophic!

## 🏗️ Building Your Digital Fortress: The Modern Approach

### Phase 1: Containerized Repository Builder

Using Docker to create your offline repository brings consistency, isolation, and predictability to the process:

```bash
# Create your project structure
mkdir -p apt-fortress/{localrepo,apt-config}
cd apt-fortress

# Create a Dockerfile for your repository builder
cat > Dockerfile << 'EOF'
FROM ubuntu:24.04

# Install required packages
RUN apt-get update && apt-get install -y \
    reprepro \
    dpkg-dev \
    wget \
    apt-utils \
    apt-rdepends \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /app

# Copy scripts
COPY setup_reprepro_mirror.sh entrypoint.sh /app/

# Make scripts executable
RUN chmod +x /app/*.sh

# Set up entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
EOF

# Create a docker-compose.yml file
cat > docker-compose.yml << 'EOF'
services:
  apt-localrepo:
    build: .
    volumes:
      - ./:/app
    environment:
      - DIST=${DIST:-$(lsb_release -sc)}
      - ARCH=amd64
    command: ["--build"]
EOF
```

### Phase 2: Intelligent Package Selection

Create a `packages.txt` file to define exactly which packages you want in your fortress:

```bash
# Create a packages.txt with pinned versions
cat > packages.txt << 'EOF'
# Core system packages
ubuntu-server=22.04.1-6
bash=5.1-6ubuntu1

# Security tools
openssh-server=1:8.9p1-3ubuntu0.4
fail2ban=1.0.1-1

# Web server
nginx=1.18.0-6ubuntu14.4
apache2=2.4.52-1ubuntu4.6

# Databases
mysql-server=8.0.34-0ubuntu0.22.04.1
postgresql=14+238

# Development tools
git=1:2.34.1-1ubuntu1.10
build-essential=12.9ubuntu3
EOF
```

### Phase 3: Smart Dependency Resolution with Caching

Create a script that intelligently handles dependencies and caches them for speed:

```bash
#!/bin/bash
# setup_reprepro_mirror.sh - The heart of your repository builder

REPO_BASE_DIR="${1:-/app/localrepo}"
PACKAGES_FILE="${2:-/app/packages.txt}"
APT_CONFIG_DIR="${3:-/app/apt-config}"
CACHE_DIR="${REPO_BASE_DIR}/cache"
DEPS_CACHE_FILE="${CACHE_DIR}/dependency_cache.txt"
TIMESTAMP_FILE="${CACHE_DIR}/last_run.timestamp"
PKG_HASH_FILE="${CACHE_DIR}/packages_hash.md5"

# Function to check if a package already exists in the repository
package_exists() {
    local package_name="$1"
    local package_version="$2"
    
    if [ -n "$package_version" ]; then
        if reprepro -b "$REPO_BASE_DIR" list "$CODENAME" "$package_name" | grep -q "$package_version"; then
            return 0
        else
            return 1
        fi
    else
        if reprepro -b "$REPO_BASE_DIR" list "$CODENAME" "$package_name" | grep -q "$package_name"; then
            return 0
        else
            return 1
        fi
    fi
}

# Function to check if we can use cached dependencies
can_use_cached_deps() {
    # Check if cache files exist
    if [ ! -f "$DEPS_CACHE_FILE" ] || [ ! -f "$PKG_HASH_FILE" ] || [ ! -f "$TIMESTAMP_FILE" ]; then
        echo "Cache files missing - can't use cache"
        return 1
    fi

    # Check if packages.txt has changed
    local current_hash=$(md5sum "$PACKAGES_FILE" | cut -d ' ' -f 1)
    local cached_hash=$(cat "$PKG_HASH_FILE")
    
    if [ "$current_hash" != "$cached_hash" ]; then
        echo "packages.txt has changed since last run - can't use cache"
        return 1
    fi
    
    # Check if apt package lists have been updated
    local apt_update_time=$(stat -c %Y /var/lib/apt/lists 2>/dev/null || echo 0)
    local last_run_time=$(cat "$TIMESTAMP_FILE")
    
    if [ "$apt_update_time" -gt "$last_run_time" ]; then
        echo "APT database has been updated since last run - can't use cache"
        return 1
    fi
    
    echo "Using cached dependencies from $DEPS_CACHE_FILE"
    return 0
}

# Save discovered dependencies to cache
save_deps_to_cache() {
    mkdir -p "$CACHE_DIR"
    cp "$ALL_PACKAGES_FILE" "$DEPS_CACHE_FILE"
    
    # Save packages.txt hash for future comparison
    md5sum "$PACKAGES_FILE" | cut -d ' ' -f 1 > "$PKG_HASH_FILE"
    
    # Save current timestamp
    date +%s > "$TIMESTAMP_FILE"
    
    echo "Dependency cache created at $DEPS_CACHE_FILE"
}

# More implementation details would go here...
```

## 🚚 The Great Package Migration: Creating Your Transfer Package

### Create a Deployment Script for the Air-Gapped System

```bash
#!/bin/bash
# create_mirror_tarball.sh - Package everything for airgapped deployment

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${1:-$SCRIPT_DIR}"
TARBALL_NAME="apt_mirror.tar.gz"
FULL_PATH="${OUTPUT_DIR}/${TARBALL_NAME}"
TEMP_DIR="/tmp/mirror_tarball_$$"
INSTALL_SCRIPT="${TEMP_DIR}/install_mirror.sh"

# Create temporary directory for building the tarball
mkdir -p "$TEMP_DIR"

# Check if we have all required components
if [ ! -d "$SCRIPT_DIR/localrepo" ] || [ -z "$(ls -A "$SCRIPT_DIR/localrepo" 2>/dev/null)" ]; then
    echo "ERROR: The localrepo directory is missing or empty."
    echo "Please run the mirror setup first to create a local repository."
    exit 1
fi

# Create installation script
cat <<EOF > "$INSTALL_SCRIPT"
#!/bin/bash
set -e

# Installation script for airgapped mirror
SCRIPT_DIR="\$(cd "\$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="/var/local/apt-mirror"
APT_CONFIG_DIR="/etc/apt"
BACKUP_DIR="\$APT_CONFIG_DIR/backup_\$(date +%Y%m%d_%H%M%S)"

# Check if running as root
if [ "\$(id -u)" -ne 0 ]; then
    echo "ERROR: This script must be run as root"
    exit 1
fi

echo "Installing local APT mirror..."

# Create installation directory
mkdir -p "\$INSTALL_DIR"

# Copy repository files
cp -r "\$SCRIPT_DIR/localrepo"/* "\$INSTALL_DIR/"

# Create backup directory for original APT sources
mkdir -p "\$BACKUP_DIR"

# Back up and disable all HTTP sources
if [ -f "\$APT_CONFIG_DIR/sources.list" ]; then
    cp "\$APT_CONFIG_DIR/sources.list" "\$BACKUP_DIR/sources.list.backup"
    echo "# All HTTP sources have been disabled and moved to \$BACKUP_DIR" > "\$APT_CONFIG_DIR/sources.list"
    echo "Original sources backed up at \$BACKUP_DIR/sources.list.backup"
fi

# Backup sources.list.d files
if [ -d "\$APT_CONFIG_DIR/sources.list.d" ]; then
    mkdir -p "\$BACKUP_DIR/sources.list.d"
    
    # Process each file
    for source_file in "\$APT_CONFIG_DIR"/sources.list.d/*.list "\$APT_CONFIG_DIR"/sources.list.d/*.sources; do
        if [ -f "\$source_file" ]; then
            filename=\$(basename "\$source_file")
            cp "\$source_file" "\$BACKUP_DIR/sources.list.d/\$filename.backup"
            
            # Disable any external repositories
            if grep -q "http" "\$source_file" || grep -q "ftp" "\$source_file"; then
                mv "\$source_file" "\$source_file.disabled"
                echo "Disabled external sources in \$filename"
            fi
        fi
    done
fi

# Set up APT configuration for local mirror
mkdir -p "\$APT_CONFIG_DIR/sources.list.d"
mkdir -p "\$APT_CONFIG_DIR/preferences.d"

# Copy APT configuration
if [ -d "\$SCRIPT_DIR/apt-config/sources.list.d" ]; then
    cp "\$SCRIPT_DIR/apt-config/sources.list.d"/* "\$APT_CONFIG_DIR/sources.list.d/"
    # Fix file paths in sources.list to point to the correct location
    sed -i "s|file:///app/localrepo|file://\$INSTALL_DIR|g" "\$APT_CONFIG_DIR/sources.list.d"/*
fi

if [ -d "\$SCRIPT_DIR/apt-config/preferences.d" ]; then
    cp "\$SCRIPT_DIR/apt-config/preferences.d"/* "\$APT_CONFIG_DIR/preferences.d/" 2>/dev/null || true
fi

# Create local apt source file
cat > "\$APT_CONFIG_DIR/sources.list.d/local-mirror.list" << APTEOF
# Local mirror for airgapped environment
deb [trusted=yes] file://\$INSTALL_DIR \$(lsb_release -sc) main
APTEOF

# Update apt
apt-get update

echo "Local APT mirror installation completed successfully!"
echo "Your system is now configured to use the local mirror."
echo "Original APT sources have been backed up to \$BACKUP_DIR"
EOF

chmod +x "$INSTALL_SCRIPT"

# Copy repository to temp directory
cp -r "$SCRIPT_DIR/localrepo" "$TEMP_DIR/"
cp -r "$SCRIPT_DIR/apt-config" "$TEMP_DIR/" 2>/dev/null || mkdir -p "$TEMP_DIR/apt-config"

# Create the tarball
tar -czf "$FULL_PATH" -C "$TEMP_DIR" .

# Cleanup
rm -rf "$TEMP_DIR"

echo "Deployment package created at $FULL_PATH"
echo "Transfer this file to your airgapped system and extract it to use."
```

## 🛠️ Running Your Repository Builder

With your containerized approach, building the repository becomes a breeze:

```bash
# Build the Docker image
docker-compose build

# Run the repository builder
docker-compose run apt-localrepo

# Create the deployment package
./create_mirror_tarball.sh
```

## 🏰 Establishing the Air-Gapped Fortress: Deployment Options

### Option 1: Simple File-Based Repository

The simplest deployment is a file-based repository:

```bash
# On your airgapped system
sudo mkdir -p /var/local/apt-mirror
sudo tar -xzf apt_mirror.tar.gz -C /tmp
sudo /tmp/install_mirror.sh
```

### Option 2: Web Server for Network Distribution

For larger environments, serve the repository through a web server:

```bash
# Nginx configuration
cat > /etc/nginx/sites-available/apt-mirror << 'EOF'
server {
    listen 80;
    server_name apt-mirror.local;
    
    root /var/local/apt-mirror;
    
    location / {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
        try_files $uri $uri/ =404;
    }
}
EOF

ln -s /etc/nginx/sites-available/apt-mirror /etc/nginx/sites-enabled/
systemctl restart nginx

# Client setup
cat > /etc/apt/sources.list.d/local-mirror.list << 'EOF'
deb [trusted=yes] http://apt-mirror.local $(lsb_release -sc) main
EOF
```

## 🔧 Advanced Repository Management

### Package Version Control with Pins

Create precise package pinning in your `apt-config/preferences.d/` directory:

```
# apt-config/preferences.d/pinned-packages
Package: nginx*
Pin: version 1.18.0-6ubuntu14.4
Pin-Priority: 1001

Package: openssh-server
Pin: version 1:8.9p1-3ubuntu0.4
Pin-Priority: 1001
```

### Repository Health Monitoring

Create a script to monitor your repository's health:

```bash
#!/bin/bash
# fortress-status.sh - Repository health check

REPO_DIR="/var/local/apt-mirror"

echo "REPOSITORY STATUS REPORT"
echo "========================="
echo "Report Date: $(date)"
echo "Package Count: $(find $REPO_DIR -name "*.deb" | wc -l) packages"
echo "Disk Usage: $(du -sh $REPO_DIR)"

echo -e "\nRECENTLY ADDED PACKAGES:"
find $REPO_DIR -name "*.deb" -mtime -7 -printf "%TY-%Tm-%Td %TH:%TM %f\n" | sort -r | head -5

echo -e "\nSYSTEM RESOURCES:"
echo "  Disk Space: $(df -h $REPO_DIR | tail -1 | awk '{print $3 "/" $2 " (" $5 " used)"}')"

# Run reprepro check if available
if command -v reprepro &> /dev/null; then
    echo -e "\nREPOSITORY INTEGRITY:"
    if reprepro -b $REPO_DIR check $(lsb_release -sc) &>/dev/null; then
        echo "  STATUS: HEALTHY"
    else
        echo "  STATUS: ISSUES DETECTED"
    fi
fi
```

## 🎯 Pro Tips for Air-Gap Survival

### The Expert's Checklist ✅

**🔐 Security First**: Keep your repository secure with limited access controls. Just because you're air-gapped doesn't mean you should be careless.

**📦 Size Optimization**: Be selective about which packages to include. Use the dependency cache to avoid redundant analysis.

**🔄 Scheduled Updates**: Create a regular process for updating your repository from a connected system, testing, and deploying to air-gapped environments.

**📋 Comprehensive Documentation**: Document your package selection strategy, update procedures, and rollback processes.

**🧪 Validation Testing**: Always test your repository in a staging environment before deployment to production air-gapped systems.

### Emergency Scenarios Playbook 📖

**Scenario 1: Critical Security Update Needed**
```
1. Identify affected packages
2. Download updates on connected system
3. Update your packages.txt with new versions
4. Rebuild the repository
5. Create and test new deployment package
6. Deploy to air-gapped systems with careful validation
```

**Scenario 2: Missing Dependencies**
```
1. Identify missing packages
2. Add to packages.txt with correct versions
3. Use the dependency cache to speed up rebuilding
4. Create a focused update package with just the needed packages
5. Deploy and test
```

## 🎊 Victory Lap: You Did It!

Congratulations! You've successfully built a fortress of packages that laughs in the face of network isolation. Your air-gapped environment is now a self-sufficient ecosystem where:

- 📦 Packages flow like a well-oiled machine
- 🔍 Dependencies are tracked with military precision  
- 🛡️ Security updates can be deployed strategically
- 🏰 Your infrastructure is truly independent

Remember, maintaining an air-gapped repository is like tending a digital garden – it requires regular care, attention, and the occasional emergency watering (package injection). But with reprepro and apt-rdepends as your trusty tools, you're well-equipped to keep your fortress thriving in the digital wilderness.

Now go forth and package responsibly! And remember: in the land of the air-gapped, the person with the working repository is king! 👑

*May your dependencies always resolve and your packages never corrupt!* 🚀