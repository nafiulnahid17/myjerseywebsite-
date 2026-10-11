/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#f7f2e6",
      "foreground": "#17140f",
      "card": "#fffaf0",
      "cardForeground": "#17140f",
      "popover": "#f6eedc",
      "popoverForeground": "#17140f",
      "primary": "#a87818",
      "primaryForeground": "#1a1306",
      "secondary": "#efe6d2",
      "secondaryForeground": "#17140f",
      "muted": "#f6eedc",
      "mutedForeground": "#6b655a",
      "accent": "#3a9f16",
      "accentForeground": "#1a1306",
      "destructive": "#b52c2c",
      "destructiveForeground": "#ffffff",
      "border": "#dccdae",
      "input": "#dccdae",
      "ring": "#a87818",
      "chart1": "#a87818",
      "chart2": "#3a9f16",
      "chart3": "#2a7a0f",
      "chart4": "#d9a94a",
      "chart5": "#6b655a",
      "sidebar": "#efe6d2",
      "sidebarForeground": "#17140f",
      "sidebarBorder": "#dccdae",
      "sidebarPrimary": "#a87818",
      "sidebarPrimaryForeground": "#1a1306",
      "sidebarAccent": "#f6eedc",
      "sidebarAccentForeground": "#17140f",
      "sidebarRing": "#a87818"
    },
    "dark": {
      "background": "#08090a",
      "foreground": "#f5efe2",
      "card": "#141614",
      "cardForeground": "#f5efe2",
      "popover": "#1a1c19",
      "popoverForeground": "#f5efe2",
      "primary": "#d9a94a",
      "primaryForeground": "#1a1306",
      "secondary": "#0f1110",
      "secondaryForeground": "#f5efe2",
      "muted": "#1a1c19",
      "mutedForeground": "#a8a294",
      "accent": "#62d42e",
      "accentForeground": "#1a1306",
      "destructive": "#e65b5b",
      "destructiveForeground": "#1a1306",
      "border": "#362c18",
      "input": "#362c18",
      "ring": "#d9a94a",
      "chart1": "#d9a94a",
      "chart2": "#62d42e",
      "chart3": "#2f8f17",
      "chart4": "#f6d987",
      "chart5": "#a8a294",
      "sidebar": "#0f1110",
      "sidebarForeground": "#f5efe2",
      "sidebarBorder": "#362c18",
      "sidebarPrimary": "#d9a94a",
      "sidebarPrimaryForeground": "#1a1306",
      "sidebarAccent": "#1a1c19",
      "sidebarAccentForeground": "#f5efe2",
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
      "bg": "#f7f2e6",
      "bg2": "#efe6d2",
      "card": "#fffaf0",
      "card2": "#f6eedc",
      "tx": "#17140f",
      "mu": "#6b655a",
      "gold": "#a87818",
      "gold2": "#d9a94a",
      "gold3": "#7a560f",
      "grn": "#3a9f16",
      "grn2": "#2a7a0f",
      "bd": "rgba(150,110,30,.28)",
      "bd2": "rgba(150,110,30,.6)",
      "sh": "0 18px 40px -16px rgba(60,40,0,.22)",
      "ink": "#1a1306"
    },
    "dark": {
      "bg": "#08090a",
      "bg2": "#0f1110",
      "card": "#141614",
      "card2": "#1a1c19",
      "tx": "#f5efe2",
      "mu": "#a8a294",
      "gold": "#d9a94a",
      "gold2": "#f6d987",
      "gold3": "#9a6f1f",
      "grn": "#62d42e",
      "grn2": "#2f8f17",
      "bd": "rgba(217,169,74,.22)",
      "bd2": "rgba(246,217,135,.5)",
      "sh": "0 22px 50px -18px rgba(0,0,0,.7),0 2px 0 rgba(255,255,255,.02) inset",
      "ink": "#1a1306"
    }
  }
} as const;

export type Tokens = typeof tokens;
export default tokens;
