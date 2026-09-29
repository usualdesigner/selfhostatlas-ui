// tokens.json → dist/style.css (shadcn registry:style), dist/shiki-theme.json, dist/tokens.ts
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
type Tok = { $type?: string; $value: any; $extensions?: { "atlas.dark"?: string } };
const src = JSON.parse(readFileSync(new URL("./tokens.json", import.meta.url), "utf8"));
const light: Record<string, string> = {}, dark: Record<string, string> = {};
function walk(node: any, path: string[]) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    const p = [...path, k];
    if (v && typeof v === "object" && "$value" in v) {
      const t = v as Tok; const name = p.join("-");
      const val = Array.isArray(t.$value) ? (t.$type === "fontFamily" ? t.$value.map(f => /\s/.test(f) ? `"${f}"` : f).join(", ") : `cubic-bezier(${t.$value.join(",")})`) : String(t.$value);
      light[name] = val; dark[name] = t.$extensions?.["atlas.dark"] ?? val;
    } else walk(v, p);
  }
}
walk(src, []);
const ref = (v: string) => v.replace(/\{([\w.-]+)\}/g, (_, r) => `var(--${r.replace(/\./g, "-")})`);
const decl = (o: Record<string, string>) => Object.entries(o).map(([k, v]) => `  --${k.replace(/^color-/, "")}: ${ref(v)};`).join("\n");
const colors = Object.keys(light).filter(k => k.startsWith("color-")).map(k => k.slice(6));
const themeColors = colors.map(c => `  --color-${c}: var(--${c});`).join("\n");
const shadcn = `  --color-background: var(--bg); --color-foreground: var(--ink);
  --color-card: var(--surface); --color-card-foreground: var(--ink);
  --color-popover: var(--surface); --color-popover-foreground: var(--ink);
  --color-primary: var(--accent); --color-primary-foreground: #FFFFFF;
  --color-secondary: var(--surface-2); --color-secondary-foreground: var(--ink);
  --color-muted-foreground: var(--muted);
  --color-accent-foreground: var(--accent-strong);
  --color-destructive: var(--danger); --color-input: var(--border-strong); --color-ring: var(--accent);`;
const text = Object.entries(light).filter(([k]) => k.startsWith("text-")).map(([k, v]) => `  --${k}: ${v};`).join("\n");
const radius = Object.entries(light).filter(([k]) => k.startsWith("radius-")).map(([k, v]) => `  --${k}: ${v};`).join("\n");
const css = `/* generated from tokens.json — do not edit */
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));

:root {
${decl(light)}
}
.dark {
${decl(dark)}
}

@theme inline {
${shadcn}
${themeColors}
  --font-sans: var(--font-plex-sans), ${light["font-sans"]};
  --font-mono: var(--font-plex-mono), ${light["font-mono"]};
${text}
${radius}
  --shadow-palette: var(--shadow-palette);
}

@utility transition-atlas { transition-property: color, background-color, border-color, text-decoration-color; transition-duration: var(--motion-fast); transition-timing-function: var(--motion-ease); }

@layer base {
  * { border-color: var(--border); }
  body { background: var(--bg); color: var(--ink); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; text-wrap: pretty; }
  a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--accent-border); }
  a:hover { color: var(--accent-strong); text-decoration-color: var(--accent-strong); }
  :focus-visible { outline: var(--focus-ring) solid var(--accent); outline-offset: var(--focus-offset); }
  pre, code, kbd { font-family: var(--font-mono); }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0ms !important; animation: none !important; } }
}
`;
const shiki = {
  name: "atlas", type: "dark",
  colors: { "editor.background": light["color-code-bg"], "editor.foreground": light["color-code-ink"] },
  tokenColors: [
    { scope: ["keyword", "storage", "entity.name.function", "support.function", "support.type.property-name"], settings: { foreground: light["color-code-accent"] } },
    { scope: ["string", "constant", "variable.parameter", "markup.underline.link"], settings: { foreground: light["color-code-string"] } },
    { scope: ["comment", "punctuation", "keyword.operator", "meta.brace"], settings: { foreground: light["color-code-punct"] } }
  ]
};
mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("./dist/style.css", import.meta.url), css);
writeFileSync(new URL("./dist/shiki-theme.json", import.meta.url), JSON.stringify(shiki, null, 2));
writeFileSync(new URL("./dist/tokens.ts", import.meta.url), `export const light = ${JSON.stringify(light, null, 2)} as const;\nexport const dark = ${JSON.stringify(dark, null, 2)} as const;\n`);
console.log(`tokens: ${Object.keys(light).length} → dist/`);
