# Dev-root — Development Setup Guide

> **Project**: Dev-root — Interactive Full-Stack Web Development Learning Platform  
> **Workspace**: `Z:/Dev Root/Dev-Root`  
> **Repository**: `https://github.com/amankr28819-prog/Dev-Root.git`

---

## 1. System Requirements

- **Node.js**: v18.0.0 or higher (Tested and verified with Node.js v24.20.0)
- **Package Manager**: `npm` v9+ (Verified with npm v11.19.0)
- **Web Browser**: Any modern evergreen browser (Chrome, Edge, Firefox, Safari)

---

## 2. Quickstart Installation

1. Open your terminal in the `Dev-Root` directory:
   ```bash
   cd "Z:\Dev Root\Dev-Root"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```

4. The development server will start at:
   ```
   http://localhost:5173
   ```
   Open this URL in your web browser to explore Dev-root.

---

## 3. Available npm Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts the local development server with Hot Module Replacement (HMR). |
| `npm run build` | `vite build` | Compiles and minifies the application bundle for production into the `dist/` folder. |
| `npm run preview` | `vite preview` | Serves the production build locally for verification. |
| `npm test` | `vitest run` | Runs automated unit and integration test suites using Vitest and JSDOM. |

---

## 4. Key Architectural Boundaries

- **Standalone Offline Execution**: Dev-root does not require a database server, cloud accounts, or third-party AI keys to run.
- **Local Progress Persistence**: Progress is saved locally in the browser's `localStorage` under `devroot_progress_v1`.
- **Reference Project Isolation**: The reference project in `reference-projects/CRP-India/` is strictly for reading, documentation, and case-study analysis. It is never bundled into Dev-root or executed by the dev server.
