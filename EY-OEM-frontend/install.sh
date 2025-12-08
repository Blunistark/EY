#!/bin/bash

# OEM Portal - Installation & Verification Script
# This script verifies all required files are present and installs dependencies

echo "🔍 OEM Portal - Installation & Verification"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the OEM directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from the FrontEnds/OEM directory"
    exit 1
fi

echo -e "${GREEN}✅ Found package.json${NC}"

# Verify critical files exist
echo ""
echo "Verifying file structure..."

files_to_check=(
    "src/App.tsx"
    "src/main.tsx"
    "src/index.css"
    "src/lib/oemApi.ts"
    "src/lib/types/index.ts"
    "src/components/layout/OEMLayout.tsx"
    "src/components/chat/ChatWidget.tsx"
    "src/routes/oem/OEMRoutes.tsx"
    "src/routes/oem/OEMDashboardPage.tsx"
    "vite.config.ts"
    "tsconfig.json"
    "tailwind.config.js"
)

missing_files=0

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file ${RED}MISSING${NC}"
        missing_files=$((missing_files + 1))
    fi
done

if [ $missing_files -gt 0 ]; then
    echo ""
    echo -e "${RED}❌ $missing_files files are missing!${NC}"
    echo "Please ensure all files were created correctly."
    exit 1
fi

echo ""
echo -e "${GREEN}✅ All required files present!${NC}"

# Check for node_modules
echo ""
if [ -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules already exists${NC}"
    read -p "Do you want to reinstall dependencies? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Removing node_modules..."
        rm -rf node_modules package-lock.json
        echo "Installing dependencies..."
        npm install
    else
        echo "Skipping dependency installation"
    fi
else
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
else
    echo ""
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Final summary
echo ""
echo "=============================================="
echo -e "${GREEN}🎉 OEM Portal is ready!${NC}"
echo "=============================================="
echo ""
echo "To start the development server:"
echo -e "${YELLOW}  npm run dev${NC}"
echo ""
echo "Then open your browser to:"
echo -e "${YELLOW}  http://localhost:3001${NC}"
echo ""
echo "📚 Documentation:"
echo "  - README.md       - Full documentation"
echo "  - QUICKSTART.md   - Quick start guide"
echo "  - PROJECT_SUMMARY.md - File structure overview"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
