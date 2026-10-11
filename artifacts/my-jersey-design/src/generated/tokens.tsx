/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#f7f9fe",
      "foreground": "#0d1b36",
      "card": "#ffffff",
      "cardForeground": "#0d1b36",
      "popover": "#ffffff",
      "popoverForeground": "#0d1b36",
      "primary": "#9c6b12",
      "primaryForeground": "#1a1306",
      "secondary": "#eaf0fb",
      "secondaryForeground": "#0d1b36",
      "muted": "#eef3fb",
      "mutedForeground": "#4b5a78",
      "accent": "#1e4fc2",
      "accentForeground": "#ffffff",
      "destructive": "#b42323",
      "destructiveForeground": "#ffffff",
      "border": "#d5deef",
      "input": "#d5deef",
      "ring": "#1e4fc2",
      "chart1": "#9c6b12",
      "chart2": "#1e4fc2",
      "chart3": "#3f74e8",
      "chart4": "#c9952f",
      "chart5": "#4b5a78",
      "sidebar": "#eef3fb",
      "sidebarForeground": "#0d1b36",
      "sidebarBorder": "#d5deef",
      "sidebarPrimary": "#9c6b12",
      "sidebarPrimaryForeground": "#1a1306",
      "sidebarAccent": "#eaf0fb",
      "sidebarAccentForeground": "#0d1b36",
      "sidebarRing": "#1e4fc2"
    },
    "dark": {
      "background": "#060912",
      "foreground": "#f4efe3",
      "card": "#0f1527",
      "cardForeground": "#f4efe3",
      "popover": "#141b31",
      "popoverForeground": "#f4efe3",
      "primary": "#d9a94a",
      "primaryForeground": "#1a1306",
      "secondary": "#0a0f1d",
      "secondaryForeground": "#f4efe3",
      "muted": "#141b31",
      "mutedForeground": "#a7aec2",
      "accent": "#5b8cff",
      "accentForeground": "#060912",
      "destructive": "#f07a7a",
      "destructiveForeground": "#060912",
      "border": "#232c48",
      "input": "#232c48",
      "ring": "#d9a94a",
      "chart1": "#d9a94a",
      "chart2": "#5b8cff",
      "chart3": "#93b4ff",
      "chart4": "#f6d987",
      "chart5": "#a7aec2",
      "sidebar": "#0a0f1d",
      "sidebarForeground": "#f4efe3",
      "sidebarBorder": "#232c48",
      "sidebarPrimary": "#d9a94a",
      "sidebarPrimaryForeground": "#1a1306",
      "sidebarAccent": "#141b31",
      "sidebarAccentForeground": "#f4efe3",
      "sidebarRing": "#d9a94a"
    }
  },
  "fontFamily": {
    "sans": [
      "DM Sans",
      "system-ui",
      "sans-serif"
    ],
    "serif": [
      "Playfair Display",
      "Georgia",
      "serif"
    ],
    "mono": [
      "ui-monospace",
      "SFMono-Regular",
      "monospace"
    ],
    "condensed": [
      "Oswald",
      "sans-serif"
    ]
  },
  "radius": "0.75rem",
  "spacing": "0.25rem",
  "effect": {
    "goldGradient": "linear-gradient(170deg,var(--gold2) 10%,var(--gold) 50%,var(--gold3) 90%)",
    "goldFill": "linear-gradient(180deg,var(--gold2),var(--gold) 55%,var(--gold3))",
    "goldHighlight": "#f6d987"
  },
  "source": {
    "light": {
      "bg": "#f7f9fe",
      "bg2": "#edf2fb",
      "card": "#ffffff",
      "card2": "#f4f7fd",
      "tx": "#0d1b36",
      "mu": "#4b5a78",
      "gold": "#9c6b12",
      "gold2": "#c9952f",
      "gold3": "#7a520c",
      "grn": "#1f8a3b",
      "grn2": "#17692c",
      "bd": "rgba(30,64,140,.14)",
      "bd2": "rgba(156,107,18,.45)",
      "sh": "0 18px 44px -18px rgba(13,40,100,.22)",
      "ink": "#1a1306",
      "blue": "#1e4fc2",
      "blue2": "#3f74e8",
      "danger": "#b42323",
      "navy": "#0b1a3d",
      "navy2": "#1d3f8f",
      "wa": "#1fa855",
      "fb": "#1877f2",
      "glass": "rgba(255,255,255,.74)",
      "page": "radial-gradient(1200px 720px at 88% -8%,rgba(63,116,232,.16),transparent 62%),radial-gradient(900px 620px at -12% 22%,rgba(201,149,47,.14),transparent 62%),radial-gradient(1000px 700px at 50% 108%,rgba(30,79,194,.10),transparent 60%),linear-gradient(180deg,#ffffff 0%,#f5f8fe 45%,#edf2fb 100%)",
      "band": "linear-gradient(135deg,#0b1a3d 0%,#123072 52%,#0a1734 100%)",
      "bandTx": "#f6f1e4",
      "bandMu": "#c2cbe0",
      "bandBd": "rgba(246,217,135,.38)",
      "glow": "rgba(63,116,232,.18)",
      "scrim": "rgba(247,249,254,.9)"
    },
    "dark": {
      "bg": "#060912",
      "bg2": "#0a0f1d",
      "card": "#0f1527",
      "card2": "#141b31",
      "tx": "#f4efe3",
      "mu": "#a7aec2",
      "gold": "#d9a94a",
      "gold2": "#f6d987",
      "gold3": "#9a6f1f",
      "grn": "#62d42e",
      "grn2": "#2f8f17",
      "bd": "rgba(217,169,74,.2)",
      "bd2": "rgba(246,217,135,.5)",
      "sh": "0 22px 50px -18px rgba(0,0,0,.7),0 2px 0 rgba(255,255,255,.02) inset",
      "ink": "#1a1306",
      "blue": "#5b8cff",
      "blue2": "#93b4ff",
      "danger": "#f07a7a",
      "navy": "#0d1a3f",
      "navy2": "#22468f",
      "wa": "#25c063",
      "fb": "#2d88ff",
      "glass": "rgba(8,12,24,.74)",
      "page": "radial-gradient(1200px 720px at 88% -8%,rgba(64,110,230,.22),transparent 62%),radial-gradient(900px 620px at -12% 30%,rgba(217,169,74,.12),transparent 62%),radial-gradient(1000px 700px at 50% 110%,rgba(34,70,143,.20),transparent 60%),linear-gradient(180deg,#070b17 0%,#060912 50%,#05070e 100%)",
      "band": "linear-gradient(135deg,#0b1226 0%,#122047 52%,#070b18 100%)",
      "bandTx": "#f6f1e4",
      "bandMu": "#aab3c9",
      "bandBd": "rgba(246,217,135,.38)",
      "glow": "rgba(91,140,255,.18)",
      "scrim": "rgba(6,9,18,.9)"
    }
  }
} as const;

export type Tokens = typeof tokens;
export default tokens;
