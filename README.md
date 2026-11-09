<div align="center">
  <h1>💻 Sabin OS Portfolio</h1>
  <p>An interactive, OS-inspired personal portfolio built with React, Vite, and Three.js.</p>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

---

## Features

Sabin OS presents a personal portfolio as an interactive desktop environment, with responsive sections for projects, skills, services, and contact information.

### OS-inspired interface

- Simulated BIOS boot sequence with retro scanlines and diagnostic steps.
- Draggable, focusable desktop windows with minimize, focus, and close controls.
- Glass-style taskbar with shortcuts and indicators for running apps.

### Projects folio

- Browse selected projects and filter them by technology.
- Desktop view presents projects in an interactive book layout with page controls.
- Mobile view uses a regular scrolling list so project images, descriptions, tags, and links fit the screen.
- Each project includes links to its live preview and source code.

### Terminal and shortcuts

- Pseudo-bash terminal with commands such as `help`, `whoami`, `clear`, and section navigation (`home`, `about`, `projects`, `skills`, `contact`).
- Open apps with commands such as `music` and `timeline`.
- Spotlight-style command palette with `Ctrl + Space` and a keyboard shortcuts reference with `Ctrl + ?`.
- Animated Matrix screen effect and an idle screensaver.

### Skills and customization

- Interactive 3D skill spheres powered by React Three Fiber and Rapier physics.
- Settings for color themes, accent colors, sound profiles, wallpapers, and CRT effects.
- Live GitHub contribution graph.

### Music and motion

- Music player with stream stations and procedurally generated focus beats.
- Beat visualizer and playback controls.
- Smooth scrolling with Lenis and interface animations with Framer Motion and GSAP.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Install and run

```bash
git clone https://github.com/sabin-khatri/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Open the local URL printed by Vite (usually [http://localhost:5173](http://localhost:5173)).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run deploy` | Publish `dist/` with GitHub Pages. |

---

## Tech Stack

- **Framework:** React 19 and Vite
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion and GSAP
- **Smooth scrolling:** Lenis
- **3D:** Three.js, React Three Fiber, and Rapier
- **Icons:** React Icons and Heroicons
- **Notifications:** React Hot Toast

---

## Project Structure

```text
src/
├── assets/         # Images and other static assets
├── components/     # Portfolio sections and reusable UI components
├── context/        # React context providers
├── data/           # Project and other portfolio data
├── lib/            # Library and settings configuration
├── utils/          # Audio, scrolling, and other helpers
├── App.jsx         # Application root
├── main.jsx        # React entry point
└── index.css       # Global styles and CSS variables
```

---

## Author

**Sabin Khatri**

- GitHub: [@sabin-khatri](https://github.com/sabin-khatri)
- LinkedIn: [Sabin Khatri](https://www.linkedin.com/in/sabin-khatri-25460b26a/)

If you like the project, consider giving it a star on GitHub.
