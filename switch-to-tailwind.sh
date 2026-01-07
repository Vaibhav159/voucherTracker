#!/bin/bash

# Backup current files
echo "📦 Backing up current files..."
cp src/App.jsx src/App.original.jsx.bak 2>/dev/null || true
cp src/main.jsx src/main.original.jsx.bak 2>/dev/null || true

# Switch to Tailwind versions
echo "🎨 Switching to Tailwind CSS redesign..."
cp src/App.tailwind.jsx src/App.jsx
cp src/main.tailwind.jsx src/main.jsx

echo "✅ Switched to Tailwind CSS version!"
echo "🚀 Run 'npm run dev' to see the redesigned site"
echo ""
echo "To restore original version, run: ./switch-to-original.sh"
