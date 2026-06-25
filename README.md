# Solar Overview Card

> **A fork of [slipx06/sunsynk-power-flow-card](https://github.com/slipx06/sunsynk-power-flow-card)** (MIT) — full credit to slipx06 and all upstream contributors for the original card, its layouts, inverter/battery/grid logic, and entity mapping system. This fork only changes branding and (incrementally) the visual styling to a more modern Material You look. All functionality and configuration options remain compatible with the upstream `sunsynk-power-flow-card` config schema.

## Why this fork?

I love the underlying data flow and configurability of the sunsynk-power-flow-card but wanted a more modern, Material 3 visual treatment — restyled icons, softer surfaces, and updated typography — without losing any of its proven features.

Changes are introduced **gradually** so the card stays drop-in compatible with existing YAML.

### v0.2.0 (initial fork)
- Renamed custom element from `sunsynk-power-flow-card` → `solar-overview-card`
- Rebranded console banner, package metadata, repository URLs
- LICENSE preserves slipx06's original copyright (required by MIT)
- All upstream functionality kept intact

Upcoming planned changes:
- Restyled node / device icons (Material You)
- Refreshed color palette + gradients
- Card surface treatment

## Installation

### HACS

1. HACS → **⋮ → Custom repositories**
2. Add `https://github.com/xprezz/solar-overview-card` as type **Lovelace**
3. Install **Solar Overview Card**

### Manual

Copy `dist/solar-overview-card.js` into `<config>/www/` and add a resource:

```yaml
url: /local/solar-overview-card.js
type: module
```

## Usage

Identical to the upstream card — just change `type:` from `custom:sunsynk-power-flow-card` to `custom:solar-overview-card`. **All other YAML stays the same.** See the [upstream documentation](https://slipx06.github.io/sunsynk-power-flow-card/) for full configuration reference; everything documented there applies here.

## Attribution

This project is a fork. **Credit for the original card belongs entirely to [slipx06](https://github.com/slipx06) and contributors.** Please ⭐ the upstream repo. Bugs in upstream functionality should ideally be reported and fixed there so everyone benefits; bugs in the visual-restyle changes specific to this fork can be filed here.

## License

MIT — see [LICENSE](LICENSE). Original copyright © 2024 slipx06. Fork modifications © 2026 xprezz.
