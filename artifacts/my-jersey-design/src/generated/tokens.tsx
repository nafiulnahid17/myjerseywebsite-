/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#f7f3e9",
      "foreground": "#201e17",
      "border": "#d6cdbb",
      "card": "#fffdf8",
      "cardForeground": "#201e17",
      "popover": "#fffdf8",
      "popoverForeground": "#201e17",
      "primary": "#806023",
      "primaryForeground": "#ffffff",
      "secondary": "#153c2d",
      "secondaryForeground": "#f7f3e9",
      "muted": "#ece5d6",
      "mutedForeground": "#645b4b",
      "accent": "#a3e635",
      "accentForeground": "#172007",
      "destructive": "#b93824",
      "destructiveForeground": "#ffffff",
      "input": "#c5b99f",
      "ring": "#806023",
      "chart1": "#806023",
      "chart2": "#517710",
      "chart3": "#287651",
      "chart4": "#a65317",
      "chart5": "#645b4b",
      "sidebar": "#eee8db",
      "sidebarForeground": "#201e17",
      "sidebarBorder": "#d6cdbb",
      "sidebarPrimary": "#806023",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#e1d7c2",
      "sidebarAccentForeground": "#201e17",
      "sidebarRing": "#806023"
    },
    "dark": {
      "background": "#0d0c09",
      "foreground": "#efe4cc",
      "border": "#373125",
      "card": "#11100c",
      "cardForeground": "#efe4cc",
      "popover": "#171512",
      "popoverForeground": "#efe9dc",
      "primary": "#c9a65a",
      "primaryForeground": "#0d0c09",
      "secondary": "#153c2a",
      "secondaryForeground": "#efe9dc",
      "muted": "#22201b",
      "mutedForeground": "#aaa292",
      "accent": "#a3e635",
      "accentForeground": "#0d0c09",
      "destructive": "#b93824",
      "destructiveForeground": "#f2eee3",
      "input": "#433c2d",
      "ring": "#c9a65a",
      "chart1": "#d6ac51",
      "chart2": "#98e425",
      "chart3": "#226244",
      "chart4": "#e97d35",
      "chart5": "#aaa292",
      "sidebar": "#171512",
      "sidebarForeground": "#efe9dc",
      "sidebarBorder": "#312c21",
      "sidebarPrimary": "#c9a65a",
      "sidebarPrimaryForeground": "#0d0c09",
      "sidebarAccent": "#26231d",
      "sidebarAccentForeground": "#efe9dc",
      "sidebarRing": "#c9a65a"
    }
  },
  "fontFamily": {
    "sans": [
      "Archivo",
      "sans-serif"
    ],
    "serif": [
      "Bodoni Moda",
      "Georgia",
      "serif"
    ],
    "mono": [
      "JetBrains Mono",
      "Menlo",
      "monospace"
    ]
  },
  "radius": "0.5rem",
  "spacing": "0.25rem",
  "effect": {
    "goldGradient": "linear-gradient(100deg,#8a6a2c 0%,#e9c77b 38%,#fff1c9 50%,#d8ac55 64%,#8a6a2c 100%)",
    "goldFill": "linear-gradient(to right,#c9a65a,#e9c77b)",
    "goldHighlight": "#e9c77b"
  }
} as const;

export type Tokens = typeof tokens;
export default tokens;
