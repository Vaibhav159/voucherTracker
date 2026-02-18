#!/bin/bash
mkdir -p public/og

# Base URL using standard Vite port
URL="http://localhost:5173/og-generator.html"

echo "Generating OG images from $URL..."

# Function to capture
capture() {
    ID=$1
    echo "Capturing $ID..."
    npx -y capture-website-cli "$URL" --output="public/og/$ID.png" --element="#$ID" --width=1200 --height=630 --scale-factor=1 --launch-options='{"headless": "new"}'
}

capture "og-guides"
capture "og-banking"
capture "og-compare"
capture "og-calculator"
capture "og-converter"
capture "og-favorites"
capture "og-wallet"
capture "og-optimizer"
capture "og-milestones"
capture "og-savings"
capture "og-ai"

echo "Done! Images saved to public/og/"
