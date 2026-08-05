import { createContext, useContext, useState, useEffect } from "react";
import { setSoundProfile as applySoundProfile } from "../utils/audio";

const STORAGE_KEY = "sabin-os-settings";

const ACCENT_MAP = {
  amber:  { h: 38,  s: 92, l: 50 },
  matrix: { h: 150, s: 100, l: 50 },
  cyber:  { h: 180, s: 100, l: 50 },
  neon:   { h: 300, s: 80, l: 65 },
  azure:  { h: 210, s: 100, l: 60 },
};

const THEMES = {
  default:    { bg: "#0a0a0a", card: "#111115", border: "rgba(255,255,255,0.08)", accent: "#f59e0b", text: "#e2e8f0", muted: "#64748b", terminal: "#0a0a0c", taskbar: "#0f0f13", section: "#050505" },
  dracula:    { bg: "#282a36", card: "#44475a", border: "rgba(189,147,249,0.15)", accent: "#bd93f9", text: "#f8f8f2", muted: "#6272a4", terminal: "#21222c", taskbar: "#1e1f29", section: "#21222c" },
  catppuccin: { bg: "#1e1e2e", card: "#313244", border: "rgba(203,166,247,0.15)", accent: "#cba6f7", text: "#cdd6f4", muted: "#6c7086", terminal: "#181825", taskbar: "#11111b", section: "#181825" },
  nord:       { bg: "#2e3440", card: "#3b4252", border: "rgba(136,192,208,0.15)", accent: "#88c0d0", text: "#eceff4", muted: "#4c566a", terminal: "#242933", taskbar: "#242933", section: "#242933" },
  tokyo:      { bg: "#1a1b26", card: "#24283b", border: "rgba(122,162,247,0.15)", accent: "#7aa2f7", text: "#c0caf5", muted: "#565f89", terminal: "#16161e", taskbar: "#16161e", section: "#16161e" },
};

const WALLPAPERS = {
  dots:     "",
  grid:     "wallpaper-grid",
  gradient: "wallpaper-gradient",
  aurora:   "wallpaper-aurora",
  shader:   "wallpaper-shader",
  "custom-image": "",
  "custom-color": "",
};

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const hslToRgb = (h, s, l) => {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
};

const setAccentRgb = (root, rgb) => {
  root.style.setProperty("--accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
};

const loadSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
};

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const saved = loadSettings();

  const [accent, setAccentState] = useState(saved.accent ?? "amber");
  const [fontSize, setFontSizeState] = useState(saved.fontSize ?? 13);
  const [crtScanlines, setCrtScanlinesState] = useState(saved.crtScanlines ?? false);
  const [theme, setThemeState] = useState(saved.theme ?? "default");
  const [soundEnabled, setSoundEnabledState] = useState(saved.soundEnabled ?? true);
  const [soundProfile, setSoundProfileState] = useState(saved.soundProfile ?? "soft");
  const [musicStation, setMusicStationState] = useState(saved.musicStation ?? "midnight-code");
  const [wallpaper, setWallpaperState] = useState(saved.wallpaper ?? "dots");
  const [customWallpaperUrl, setCustomWallpaperUrlState] = useState(saved.customWallpaperUrl ?? "");
  const [customBgColor, setCustomBgColorState] = useState(saved.customBgColor ?? "");

  const applyAccent = (accentId, themeId) => {
    const root = document.documentElement;
    const { h, s, l } = ACCENT_MAP[accentId] || ACCENT_MAP.amber;
    const accentHex = `hsl(${h}, ${s}%, ${l}%)`;
    root.style.setProperty("--accent", `${h} ${s}% ${l}%`);
    root.style.setProperty("--accent-hex", accentHex);
    setAccentRgb(root, hslToRgb(h, s, l));
    if (themeId === "default") {
      root.style.setProperty("--os-accent", accentHex);
    }
  };

  const applyTheme = (themeId) => {
    const t = THEMES[themeId] || THEMES.default;
    const root = document.documentElement;
    root.style.setProperty("--os-bg", t.bg);
    root.style.setProperty("--os-card", t.card);
    root.style.setProperty("--os-border", t.border);
    root.style.setProperty("--os-accent", t.accent);
    root.style.setProperty("--os-text", t.text);
    root.style.setProperty("--os-muted", t.muted);
    root.style.setProperty("--os-terminal", t.terminal);
    root.style.setProperty("--os-taskbar", t.taskbar);
    root.style.setProperty("--section-bg", t.section);
    document.body.style.color = t.text;
    setAccentRgb(root, hexToRgb(t.accent));
  };

  const applyWallpaper = (wp, url = customWallpaperUrl, color = customBgColor) => {
    // Reset background styles first
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundColor = "";

    Object.values(WALLPAPERS).forEach(cls => cls && document.body.classList.remove(cls));

    if (wp === 'custom-image') {
      if (url) {
        document.body.style.backgroundImage = `url(${url})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
      }
    } else if (wp === 'custom-color') {
      if (color) {
        document.body.style.backgroundColor = color;
        document.documentElement.style.setProperty("--os-bg", color);
      }
    } else {
      const cls = WALLPAPERS[wp];
      if (cls) document.body.classList.add(cls);
      const t = THEMES[theme] || THEMES.default;
      document.documentElement.style.setProperty("--os-bg", t.bg);
    }
  };

  const persist = (patch) => {
    const next = {
      accent, fontSize, crtScanlines, theme, soundEnabled,
      soundProfile, musicStation, wallpaper, customWallpaperUrl, customBgColor, ...patch,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const setAccent = (a) => { setAccentState(a); applyAccent(a, theme); persist({ accent: a }); };
  const setTheme = (t) => {
    setThemeState(t);
    applyTheme(t);
    if (t === "default") applyAccent(accent, t);
    persist({ theme: t });
  };
  const setFontSize = (s) => { setFontSizeState(s); document.documentElement.style.setProperty("--ui-font-size", `${s}px`); persist({ fontSize: s }); };
  const setCrtScanlines = (v) => { setCrtScanlinesState(v); persist({ crtScanlines: v }); };
  const setSoundEnabled = (v) => { setSoundEnabledState(v); persist({ soundEnabled: v }); };
  const setSoundProfile = (p) => { setSoundProfileState(p); applySoundProfile(p); persist({ soundProfile: p }); };
  const setMusicStation = (id) => { setMusicStationState(id); persist({ musicStation: id }); };
  const setWallpaper = (wp) => { setWallpaperState(wp); applyWallpaper(wp); persist({ wallpaper: wp }); };
  const setCustomWallpaperUrl = (url) => { setCustomWallpaperUrlState(url); applyWallpaper(wallpaper, url, customBgColor); persist({ customWallpaperUrl: url }); };
  const setCustomBgColor = (color) => { setCustomBgColorState(color); applyWallpaper(wallpaper, customWallpaperUrl, color); persist({ customBgColor: color }); };

  useEffect(() => {
    applyTheme(theme);
    applyAccent(accent, theme);
    applyWallpaper(wallpaper);
    applySoundProfile(soundProfile);
    document.documentElement.style.setProperty("--ui-font-size", `${fontSize}px`);
  }, []);

  return (
    <SettingsContext.Provider value={{
      accent, fontSize, crtScanlines, theme, soundEnabled, soundProfile, musicStation, wallpaper,
      customWallpaperUrl, customBgColor,
      setAccent, setFontSize, setCrtScanlines, setTheme, setSoundEnabled,
      setSoundProfile, setMusicStation, setWallpaper, setCustomWallpaperUrl, setCustomBgColor,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
};
