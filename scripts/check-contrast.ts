// Fails when a text/background token pair in tokens.json drops below WCAG AA (4.5:1) in either theme.
import { light, dark } from "../packages/tokens/dist/tokens.ts";
const pairs: [string, string, number][] = [
  ["color-ink", "color-bg", 4.5], ["color-ink-2", "color-bg", 4.5], ["color-ink-3", "color-bg", 4.5], ["color-muted", "color-bg", 4.5],
  ["color-ink", "color-surface", 4.5], ["color-ink-3", "color-surface-2", 4.5], ["color-muted", "color-surface", 4.5],
  ["color-accent", "color-bg", 4.5], ["color-accent-strong", "color-bg", 4.5], ["color-accent", "color-accent-bg", 4.5],
  ["color-warning", "color-warning-bg", 4.5], ["color-danger", "color-danger-bg", 4.5],
  ["color-code-ink", "color-code-bg", 4.5], ["color-code-accent", "color-code-bg", 4.5], ["color-code-string", "color-code-bg", 4.5], ["color-code-punct", "color-code-bg", 3],
  ...[1,2,3,4,5].flatMap(n => [[`color-marker-${n}`, "color-bg", 4.5], [`color-marker-${n}`, `color-marker-${n}-bg`, 4.5]] as [string,string,number][]),
];
const lum = (hex: string) => { const [r,g,b] = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255).map(c => c <= .03928 ? c/12.92 : ((c+.055)/1.055)**2.4); return .2126*r+.7152*g+.0722*b; };
const ratio = (a: string, b: string) => { const [x,y] = [lum(a), lum(b)]; return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); };
let fail = 0;
for (const [theme, t] of [["light", light], ["dark", dark]] as const) for (const [fg, bg, min] of pairs) {
  const r = ratio((t as any)[fg], (t as any)[bg]);
  if (r < min) { fail++; console.error(`FAIL ${theme} ${fg} on ${bg}: ${r.toFixed(2)} < ${min}`); }
}
console.log(fail ? `${fail} contrast failures` : `all ${pairs.length * 2} pairs pass`);
process.exit(fail ? 1 : 0);
