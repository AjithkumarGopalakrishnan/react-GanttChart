# React Gantt Chart — Virtualization Demo

A high-performance Gantt chart built with **Syncfusion's React Gantt component** that smoothly renders **50,000 – 100,000 tasks** using built-in virtualization.

## 🔗 Live Demo

👉 **https://ajithkumargopalakrishnan.github.io/react-GanttChart**

## ✨ Features Demonstrated

- Row-level virtualization (`enableVirtualization`)
- Timeline virtualization (`enableTimelineVirtualization`)
- Auto date scheduling toggle (`autoCalculateDateScheduling`)
- Inline editing, row selection, tree expand/collapse
- Real-time performance benchmarking via the `dataBound` event

## 🚀 Run Locally

```bash
npm install
npm start          # opens http://localhost:3000
```

Production build & deploy:

```bash
npm run build
npm run deploy     # publishes to GitHub Pages
```

## 📂 Project Structure

```
public/index.html   - Page shell + Syncfusion Tailwind theme
src/index.js        - Gantt component + virtual data generator
src/data.js         - Pre-built sample datasets (projectNewData, templateData, zoomingData)
src/index.css       - Component-level styles
```

## ⚙️ How It Works

1. Pick a dataset size (50K / 75K / 100K) from the dropdown.
2. `generateVirtualData` creates a hierarchical task tree on the fly.
3. The `dataBound` event fires after rendering — load time is displayed.
4. `enableVirtualization` ensures only visible rows are in the DOM.

## 🌐 Tech Stack

- React 18.1
- Syncfusion EJ2 React Gantt 34.2.4
- Deployed via GitHub Pages