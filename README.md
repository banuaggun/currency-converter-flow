# 💱 Currency Converter & Market Snapshot

A modern, fast, and responsive **Currency Converter** web application built with **React**, **TypeScript**, and **Redux Toolkit (RTK Query)**. The styling is crafted entirely using **Pure CSS** without any UI libraries, demonstrating a strong grip on vanilla layouts and smooth animations.

## ✨ Features

- **Dynamic Currency Conversion:** Seamlessly convert between multiple global currencies with accurate rates.
- **Market Snapshot:** A dedicated dashboard displaying daily major currency pairs (EUR/USD, USD/JPY, GBP/USD, etc.).
- **Smart UX Data Sync:** The application fetches official reference rates from the **European Central Bank (ECB)** via the Frankfurter API. It includes a dynamic `Last Updated` badge to communicate data freshness clearly to the user.
- **Pure CSS Layouts & Animations:** Built completely with vanilla CSS, featuring custom responsive grids, flexbox alignments, smooth transitions, and tactile hover states.
- **Robust State Management:** Powered by RTK Query for efficient data fetching, automated caching, and clean asynchronous architecture.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.8
- **Language:** TypeScript (TSX)
- **State Management & Data Fetching:** Redux Toolkit & RTK Query
- **Styling:** Pure CSS (Custom variables, Keyframes, Transitions)
- **API Provider:** Frankfurter API (European Central Bank data source)

## 📦 Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com
   ```

2. **Navigate into the project directory:**

   ```bash
   cd YOUR_REPO_NAME
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the local development server:**

   ```bash
   npm run dev
   ```

5. Open the local link (usually `http://localhost:5173`) in your browser to view the app.

## 💡 Architecture & UX Decisions

- **Handling Daily API Constraints:** The Frankfurter API updates its dataset once a day. Instead of forcing repetitive network requests with a traditional "Refresh" button that yields identical data, the UI was refactored to include a `Last Updated` badge. This provides a transparent UX, indicating exact data alignment with the European Central Bank's daily schedule.
- **Pure CSS Approach:** Bypassing heavy frameworks like Tailwind or Component Libraries, this project relies purely on native CSS features like **CSS Variables (Custom Properties)** for easy theme management and custom timing functions for smooth visual feedback.
