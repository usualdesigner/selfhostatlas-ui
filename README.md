# atlas-ui

The engineer's reference, as a component library. A [shadcn/ui](https://ui.shadcn.com) registry on Tailwind v4, extracted from [selfhostatlas.com](https://selfhostatlas.com).

Warm paper and ink, IBM Plex Sans + Mono, one green accent. Borders instead of shadows. Light and dark as equals.

## Install

Add the registry to your `components.json`:

```json
{ "registries": { "@atlas": "https://usualdesigner.github.io/selfhostatlas-ui/r/{name}.json" } }
```

Then:

```sh
npx shadcn@latest add @atlas/style
npx shadcn@latest add @atlas/callout @atlas/type-tile
```

`@atlas/style` installs the tokens and base layer; every component depends on it. Components land in your repo as plain `.tsx` you own.

## Principles

1. **Borders, not shadows.** Two elevations: flat, and the one palette shadow.
2. **Dark is a peer.** Every token has a dark value. Components never take a theme prop.
3. **One accent.** Green for links, savings and the recommendation; amber for effort; five marker hues for content type. Nothing else.
4. **You own the code.**

## Repository

- `packages/tokens` — `tokens.json` (W3C DTCG) → generated `style.css`, Shiki theme, TS constants
- `packages/registry` — the shadcn registry (`registry.json`, `ui/`, `components/`, `blocks/`, `lib/`)
- `apps/docs` — docs site, also hosts the built registry at `/r/*.json`

```sh
pnpm i
pnpm build:tokens      # → packages/tokens/dist
pnpm build:registry    # → apps/docs/public/r
```

## License

MIT. IBM Plex is licensed under the SIL Open Font License.
