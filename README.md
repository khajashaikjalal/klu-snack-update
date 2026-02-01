# 🌷 Tulips Boys Hostel – Today’s Snack

A premium, real-time web application designed to keep students updated on the daily evening snack. Built with **React**, **Vite**, and **Firebase Firestore**.

![App Screenshot](https://via.placeholder.com/800x400?text=App+Screenshot+Placeholder)

## ✨ Features

- **🚀 Instant Load Performance**: App shell paints immediately (0ms blocking) using lazy-loading and skeleton screens.
- **🔥 Real-Time Updates**: Powered by **Firebase Firestore**. Snack updates sync instantly across all devices.
- **📱 Mobile-First Design**: A clean, "premium" aesthetic with smooth animations and responsive layout.
- **💾 Offline Persistence**: Works seamlessly even with flaky hostel internet connection.
- **✅ Verification System**: Students can verify if the snack is actually available or request a correction.

## 🛠 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Variables & Utility classes) + [Lucide Icons](https://lucide.dev/)
- **Backend / Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) (NoSQL)
- **Deployment**: [GitHub](https://github.com/khajashaikjalal/klu-snack-update)

## ⚡ Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/khajashaikjalal/klu-snack-update.git
    cd klu-snack-update
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/       # Header and container layouts
│   ├── snack/        # Add/Verify Modals
│   └── ui/           # Reusable UI (Button, Skeleton)
├── screens/
│   └── HomeScreen.jsx # Main view logic
├── App.jsx           # State management & Firebase Logic
└── index.css         # Global styles & Theme variables
```

## 🏎 Performance Optimizations

This app uses the "Performance Trinity" strategy:
1.  **Immediate UI Rendering**: The skeleton UI renders before the JavaScript bundle finishes parsing.
2.  **Lazy-Loaded Firebase**: The 200kb+ Firebase SDK is imported dynamically *after* the initial paint.
3.  **Offline Caching**: Firestore persists data to `IndexedDB`, allowing instant loads on subsequent visits.

---

**Developed for Tulips Boys Hostel** 🌷
