<div align="center">
  <h1>💻 Sabin OS Portfolio</h1>
  <p>An interactive, OS-themed personal portfolio built with React, Vite, and Three.js.</p>
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
</div>

---

## 🌟 Features

Sabin OS is packed with premium, interactive, and nostalgic desktop features crafted to deliver a modern web experience:

### 🖥️ OS-Themed Environment
- **Interactive Boot Sequence:** A simulated BIOS boot screen that runs on startup with retro scanlines and diagnostic steps.
- **Draggable & Focusable Windows:** Desktop windows (`DraggableWindow`, `WindowFrame`) equipped with minimize, focus, and close controls. Clicking any window automatically raises its depth level (z-index).
- **Glassmorphic Taskbar:** A premium blur-filter dock housing quick launch application shortcuts and indicators for running processes.

### 💻 Command Line Terminal
- **Interactive Console:** A pseudo-bash interface (`Terminal.jsx`) with realistic audio effects and custom system command actions:
  - `help` / `whoami` / `clear`
  - `home` / `about` / `projects` / `skills` / `contact` (Scroll navigation commands)
  - `music` / `timeline` (Application execution commands)
  - `neofetch` (Prints retro Sabin OS configurations and hardware properties)
  - `matrix` (Launches an animated Matrix code screen effect)
  - `audit` / `lighthouse` (Performs a simulated 100% score Performance and SEO audit)
  - `sudo` (Access denial safety action)

### ⚛️ 3D Physics Laboratory (Skills Showcase)
- **Interactive Spheres:** Powered by `@react-three/fiber` and `@react-three/rapier` 3D physics engine.
- **Pointer Tracking:** Mouse pointer or touch drags control an invisible kinematic cursor, letting you collide with, grab, and toss the skill spheres around.
- **Dynamic Adaptability:** Scales the number of physical elements and texture filters automatically based on system viewport size for optimized performance.

### 🎵 Dual-Mode Music Player
- **Diverse Stations:** Play live audio streams (e.g., *Lofi Radio*, *Jazz & Hop* via safe YouTube feeds) or procedurally-synthesized focus beats generated entirely in-browser using Web Audio APIs.
- **Beat Visualizer:** Features a responsive bouncing equalizer/visualizer bar matching the musical beat.
- **Media Controls:** Full play, pause, next/prev track cycle, volume adjustments, and instant mute capabilities.

### ⚙️ Customization Preferences Center
- **Theme Selection:** Quickly switch between 5 preset color schemes (Default, Dracula, Catppuccin, Nord, Tokyo Night).
- **Accent Highlighting:** Apply neon accents across the UI (Amber, Matrix Green, Cyber Cyan, Neon Fuchsia, Azure Blue).
- **Sound Profile Engine:** Toggle system click sounds and choose between 4 audio profiles (*Soft*, *Retro*, *Arcade*, *Minimal*).
- **Desktop Wallpapers:** 4 dynamic patterns (Dot Grid, Grid Lines, Gradient, Aurora).
- **Nostalgic Overlay:** Toggle a CRT monitor filter with scanline animations.

### 🔍 Search & Quick Operations
- **Spotlight-Style Command Palette:** Triggered via `Ctrl + Space` for rapid page scrolling or desktop app execution.
- **Keyboard Shortcuts Reference:** An overlay modal (`Ctrl + ?`) listing quick navigation keybinds.
- **Atmospheric Screensaver:** Triggers automatically after 45s of idle state, showing a neon glowing digital clock. Instantly wakes on any user input.
- **Live GitHub Calendar Graph:** Displays live contribution metrics directly from the GitHub API using a custom error-boundary widget.

### ⚡ Aesthetics & Performance
- **Buttery Smooth Scroll:** Powered by `Lenis` for premium scroll interpolation and fluidity.
- **Spring Animations:** Enhanced with `framer-motion` and `gsap` for bouncy micro-interactions and transition state persistence.
- **Smart Loading & Error Isolation:** Implements intersection observers to lazy-load resource-intensive sections, and custom React Error Boundaries to prevent crash propagation.


---

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/sabin-khatri/my-portfolio.git
cd my-portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the portfolio in action.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion, GSAP
- **Smooth Scroll:** Lenis
- **3D Graphics:** Three.js, React Three Fiber
- **Icons:** React Icons, Heroicons
- **Toasts:** React Hot Toast

---

## 📂 Project Structure

```text
src/
├── assets/         # Static images, PDFs, and media files
├── components/     # Reusable React components (Navbar, Taskbar, Windows, etc.)
├── context/        # React Context providers for global state management
├── data/           # JSON/JS data files for projects, skills, etc.
├── lib/            # Library setups and Context configurations (SettingsContext)
├── utils/          # Helper functions (audio handling, scrolling logic)
├── App.jsx         # Main application root and OS logic
├── main.jsx        # React DOM rendering entry point
└── index.css       # Global styles, Tailwind directives, and CSS variables
```

---

## 👨‍💻 Author

**Sabin Khatri**  
- GitHub: [@sabin-khatri](https://github.com/sabin-khatri)
- LinkedIn: [Sabin Khatri](https://www.linkedin.com/in/sabin-khatri-25460b26a/)

If you like this project, don't forget to give it a ⭐ on GitHub!
