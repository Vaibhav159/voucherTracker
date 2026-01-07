#!/bin/bash

# Restore original files
echo "📦 Restoring original files..."
if [ -f "src/App.original.jsx.bak" ]; then
  cp src/App.original.jsx.bak src/App.jsx
  echo "✅ Restored App.jsx"
else
  echo "⚠️  No backup found for App.jsx"
fi

if [ -f "src/main.original.jsx.bak" ]; then
  cp src/main.original.jsx.bak src/main.jsx
  echo "✅ Restored main.jsx"
else
  echo "⚠️  No backup found for main.jsx"
fi

echo "✅ Switched back to original version!"
echo "🚀 Run 'npm run dev' to see the original site"
