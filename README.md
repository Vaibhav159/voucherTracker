# 🎟️ Voucher Tracker

 > A community-driven platform to track shopping voucher caps, fees, and platforms. 
 > **[Live Demo](https://vaibhav159.github.io/voucherTracker/)**

![Screenshot](https://via.placeholder.com/800x400?text=Voucher+Tracker+UI+Preview)

## 🚀 Features
- **Multi-Platform Comparison**: See caps and fees for Amazon, Flipkart, Uber, etc., across different buying platforms (Gyftr, iShop, etc.).
- **Smart Search**: Filter instantly by brand or platform (e.g., "Show all Gyftr vouchers").
- **Deep Space UI**: Modern, glassmorphism-based design with an aurora background.
- **Community Powered**: Data is stored in a simple JSON-like file, allowing anyone to suggest updates.

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Variables, Glassmorphism, Animations)
- **Routing**: React Router DOM (HashRouter)
- **Deployment**: GitHub Pages

## 🤝 How to Contribute Data
Found a new voucher cap? Or a fee change?
1.  Click the **"Suggest Data Change"** button in the app.
2.  This opens the `src/data/vouchers.js` file on GitHub.
3.  Click the **Pencil Icon** to edit.
4.  Add or modify the data:
    ```js
    {
      id: "unique-id",
      brand: "Brand Name",
      category: "Category",
      platforms: [
        { name: "Platform", cap: "10k/month", fee: "2%", link: "..." }
      ]
    }
    ```
5.  Scroll down and click **"Propose changes"**.

## 💻 Running Locally
```bash
# Clone the repo
git clone https://github.com/Vaibhav159/voucherTracker.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📄 License
MIT License. Free to use and modify.
