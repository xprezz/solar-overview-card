/**
 * Solar Overview Card
 * A Material You inspired solar / battery / grid / EV overview card for Home Assistant.
 *
 * Repository: https://github.com/xprezz/solar-overview-card
 * License: MIT
 */

import { LitElement, html, css, svg, nothing } from 'lit';

const CARD_VERSION = '0.1.2';

// eslint-disable-next-line no-console
console.info(
  `%c SOLAR-OVERVIEW-CARD %c v${CARD_VERSION} `,
  'color:white;background:#0b6e4f;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;',
  'color:#0b6e4f;background:#e6f4ec;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;'
);

const DEFAULTS = {
  title: 'Solar Overview',
  show_solar: true,
  show_battery: true,
  show_grid: true,
  show_home: true,
  show_ev: true,
  battery_capacity_kwh: 0,
  animate: true,
  decimals_power: 0,
  decimals_energy: 1,
};

const numberOr = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const fmtPower = (watts, decimals = 0) => {
  const w = numberOr(watts, 0);
  if (Math.abs(w) >= 1000) return `${(w / 1000).toFixed(Math.max(decimals, 1))} kW`;
  return `${w.toFixed(decimals)} W`;
};

const fmtEnergy = (kwh, decimals = 1) => `${numberOr(kwh, 0).toFixed(decimals)} kWh`;

const stateValue = (hass, entityId) => {
  if (!entityId || !hass || !hass.states[entityId]) return null;
  return hass.states[entityId];
};

const stateNum = (hass, entityId, fallback = 0) => {
  const s = stateValue(hass, entityId);
  if (!s) return fallback;
  return numberOr(s.state, fallback);
};

const stateUnit = (hass, entityId) => {
  const s = stateValue(hass, entityId);
  return s?.attributes?.unit_of_measurement ?? '';
};

const stateAsWatts = (hass, entityId) => {
  const s = stateValue(hass, entityId);
  if (!s) return 0;
  const n = numberOr(s.state, 0);
  const u = (s.attributes?.unit_of_measurement || '').toLowerCase();
  return u === 'kw' ? n * 1000 : n;
};

const stateAsKwh = (hass, entityId) => {
  const s = stateValue(hass, entityId);
  if (!s) return 0;
  const n = numberOr(s.state, 0);
  const u = (s.attributes?.unit_of_measurement || '').toLowerCase();
  return u === 'wh' ? n / 1000 : n;
};

// Read a section's power respecting `invert: true`
const sectionPower = (hass, section, key = 'power') => {
  if (!section || !section[key]) return 0;
  const v = stateAsWatts(hass, section[key]);
  return section.invert ? -v : v;
};

// Compute net grid power. Supports either:
//  - grid.power            (signed; + = import, − = export, flip with invert: true)
//  - grid.power_import + grid.power_export  (separate sensors → net = import − export)
const gridNetWatts = (hass, grid) => {
  if (!grid) return 0;
  if (grid.power_import || grid.power_export) {
    const imp = grid.power_import ? Math.abs(stateAsWatts(hass, grid.power_import)) : 0;
    const exp = grid.power_export ? Math.abs(stateAsWatts(hass, grid.power_export)) : 0;
    return imp - exp;
  }
  return sectionPower(hass, grid);
};

// --- Card -------------------------------------------------------------------

class SolarOverviewCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host {
      --so-radius-xl: 28px;
      --so-radius-lg: 22px;
      --so-radius-md: 16px;
      --so-radius-sm: 12px;
      --so-gap: 14px;
      --so-pad: 18px;

      --so-solar: var(--solar-overview-solar-color, #f5a524);
      --so-battery: var(--solar-overview-battery-color, #ec88c0);
      --so-grid: var(--solar-overview-grid-color, #ef4444);
      --so-grid-export: var(--solar-overview-grid-export-color, #22c55e);
      --so-home: var(--solar-overview-home-color, #14b8a6);
      --so-ev: var(--solar-overview-ev-color, #6366f1);

      --so-surface: var(--ha-card-background, var(--card-background-color, #fff));
      --so-surface-2: color-mix(in srgb, var(--so-surface) 85%, var(--primary-text-color) 15%);
      --so-on-surface: var(--primary-text-color);
      --so-on-surface-variant: var(--secondary-text-color);
      --so-outline: color-mix(in srgb, var(--primary-text-color) 14%, transparent);
    }

    ha-card {
      padding: var(--so-pad);
      border-radius: var(--so-radius-xl);
      overflow: hidden;
      background: var(--so-surface);
      box-shadow: var(--ha-card-box-shadow, 0 1px 2px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06));
      border: 1px solid var(--so-outline);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .title {
      font-size: 1.15rem;
      font-weight: 600;
      letter-spacing: 0.1px;
      color: var(--so-on-surface);
    }

    .subtitle {
      font-size: 0.82rem;
      color: var(--so-on-surface-variant);
    }

    .header-stats {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--so-solar) 14%, transparent);
      color: var(--so-on-surface);
      font-size: 0.78rem;
      font-weight: 600;
      border: 1px solid color-mix(in srgb, var(--so-solar) 35%, transparent);
    }
    .pill.battery { background: color-mix(in srgb, var(--so-battery) 14%, transparent); border-color: color-mix(in srgb, var(--so-battery) 35%, transparent); }
    .pill.grid { background: color-mix(in srgb, var(--so-grid) 14%, transparent); border-color: color-mix(in srgb, var(--so-grid) 35%, transparent); }
    .pill.ev { background: color-mix(in srgb, var(--so-ev) 14%, transparent); border-color: color-mix(in srgb, var(--so-ev) 35%, transparent); }

    .flow-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-height: 300px;
      margin: 4px auto 14px;
      /* Subtle radial glow behind the diagram */
      background:
        radial-gradient(ellipse 60% 50% at 50% 55%,
          color-mix(in srgb, var(--so-solar) 6%, transparent) 0%,
          transparent 70%);
    }
    .flow-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: visible;
    }

    /* Flowing-dash energy line */
    .flow-line {
      fill: none;
      stroke-linecap: round;
      stroke-width: 2.5;
      stroke-dasharray: 1 8;
      stroke-dashoffset: 0;
      filter: drop-shadow(0 0 3px var(--line-color, currentColor));
    }
    .flow-line.idle { stroke-dasharray: none; opacity: 0.18; }
    .flow-line.active { animation: so-flow var(--flow-dur, 2.5s) linear infinite; }
    .flow-line.active.reverse { animation-direction: reverse; }
    @keyframes so-flow {
      from { stroke-dashoffset: 0; }
      to   { stroke-dashoffset: -18; }
    }

    .flow-line-bg {
      fill: none;
      stroke: var(--line-color, currentColor);
      stroke-opacity: 0.12;
      stroke-width: 4;
      stroke-linecap: round;
    }

    /* Nodes */
    .node {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      z-index: 2;
      text-align: center;
      width: 96px;
    }
    .node-icon {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--node-color, #888);
      --mdc-icon-size: 30px;
      background:
        radial-gradient(circle at 30% 25%,
          color-mix(in srgb, var(--node-color, #888) 35%, var(--so-surface)) 0%,
          color-mix(in srgb, var(--node-color, #888) 14%, var(--so-surface)) 55%,
          color-mix(in srgb, var(--node-color, #888) 8%, var(--so-surface)) 100%);
      border: 1.5px solid color-mix(in srgb, var(--node-color, #888) 55%, transparent);
      box-shadow:
        0 6px 14px -4px color-mix(in srgb, var(--node-color, #888) 50%, transparent),
        inset 0 1px 0 color-mix(in srgb, #fff 25%, transparent);
      transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease;
    }
    .node.active .node-icon::after {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 2px solid color-mix(in srgb, var(--node-color, #888) 45%, transparent);
      opacity: 0;
      animation: so-pulse 2.6s ease-out infinite;
    }
    @keyframes so-pulse {
      0%   { transform: scale(.85); opacity: .55; }
      80%  { transform: scale(1.25); opacity: 0; }
      100% { transform: scale(1.25); opacity: 0; }
    }
    .node.clickable { cursor: pointer; }
    .node.clickable:hover .node-icon { transform: scale(1.06); }
    .node-power {
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--so-on-surface);
      margin-top: 6px;
      line-height: 1.1;
      letter-spacing: -0.01em;
    }
    .node-sub {
      font-size: 0.72rem;
      color: var(--so-on-surface-variant);
      line-height: 1.15;
    }
    .node-label {
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--so-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 2px;
    }
    .node.small { width: 80px; }
    .node.small .node-icon { width: 48px; height: 48px; --mdc-icon-size: 24px; }

    /* SOC arc for the battery node */
    .soc-ring {
      position: absolute;
      inset: -5px;
      transform: rotate(-90deg);
      pointer-events: none;
    }
    .soc-ring circle {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
    }
    .soc-ring .soc-track { stroke: color-mix(in srgb, var(--node-color, #888) 18%, transparent); }
    .soc-ring .soc-arc { stroke: var(--node-color, #888); transition: stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1); }

    /* Inverter hub */
    .inverter-hub {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      background:
        radial-gradient(circle at 30% 25%,
          color-mix(in srgb, var(--so-solar) 22%, var(--so-surface)) 0%,
          color-mix(in srgb, var(--so-solar) 8%, var(--so-surface)) 60%,
          var(--so-surface) 100%);
      border: 1.5px solid color-mix(in srgb, var(--so-solar) 35%, var(--so-outline));
      color: var(--so-on-surface);
      box-shadow:
        0 10px 24px -8px color-mix(in srgb, var(--so-solar) 40%, transparent),
        inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent);
      z-index: 2;
    }
    .inverter-hub ha-icon {
      --mdc-icon-size: 30px;
      color: color-mix(in srgb, var(--so-solar) 75%, var(--so-on-surface));
    }
    .inverter-hub .inv-label {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--so-on-surface-variant);
      margin-top: -2px;
    }

    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--so-gap);
      margin-top: 10px;
    }

    .tile {
      background: var(--so-surface-2);
      border-radius: var(--so-radius-lg);
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid var(--so-outline);
      transition: transform .2s ease, box-shadow .2s ease;
    }
    .tile:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.08); }

    .tile-head {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--so-on-surface-variant);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .tile-head ha-icon { --mdc-icon-size: 18px; }

    .tile-value {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--so-on-surface);
      line-height: 1.1;
    }

    .tile-sub {
      font-size: 0.8rem;
      color: var(--so-on-surface-variant);
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .bar {
      height: 8px;
      width: 100%;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      border-radius: 999px;
      overflow: hidden;
      margin-top: 4px;
    }
    .bar > span {
      display: block;
      height: 100%;
      border-radius: 999px;
      transition: width .6s ease;
    }

    .mppt-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .chip {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--so-solar) 14%, transparent);
      color: var(--so-on-surface);
      border: 1px solid color-mix(in srgb, var(--so-solar) 30%, transparent);
    }

    .clickable { cursor: pointer; }

    @media (max-width: 480px) {
      .header { flex-direction: column; align-items: flex-start; }
      .header-stats { justify-content: flex-start; }
    }
  `;

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = {
      ...DEFAULTS,
      ...config,
      solar: { mppts: [], ...(config.solar || {}) },
      battery: { ...(config.battery || {}) },
      grid: { ...(config.grid || {}) },
      home: { ...(config.home || {}) },
      ev: { ...(config.ev || {}) },
      inverter: { ...(config.inverter || {}) },
    };
  }

  getCardSize() {
    return 6;
  }

  static getStubConfig() {
    return {
      title: 'Solar Overview',
      solar: { total_power: '', total_today: '', predicted_remaining_today: '', mppts: [] },
      battery: { soc: '', power: '', daily_charge: '', daily_discharge: '', capacity_kwh: 0 },
      grid: { power: '', daily_import: '', daily_export: '' },
      home: { power: '', daily_energy: '' },
      ev: { power: '', session_energy: '', soc: '' },
    };
  }

  static getConfigElement() {
    return document.createElement('solar-overview-card-editor');
  }

  _click(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  // -------- Flow diagram ----------------------------------------------------

  // Returns animation duration (s) per W. Calmer: 4s slow → 2s fast.
  _flowDur(power) {
    const w = Math.abs(power);
    if (w < 5) return null;
    return Math.max(2.0, 4.0 - Math.min(w, 8000) / 8000 * 2.0).toFixed(2);
  }

  _nodeEl({ x, y, label, icon, color, power, sub, entityId, small = false, soc = null, active = false }) {
    const r = 30, c = 2 * Math.PI * r;
    const arc = soc != null ? c * (1 - Math.max(0, Math.min(100, soc)) / 100) : null;
    return html`
      <div class="node ${small ? 'small' : ''} ${active ? 'active' : ''} ${entityId ? 'clickable' : ''}"
           style="left:${x}%; top:${y}%; --node-color:${color};"
           @click=${() => this._click(entityId)}>
        <div class="node-icon">
          ${soc != null ? svg`
            <svg class="soc-ring" viewBox="0 0 70 70">
              <circle class="soc-track" cx="35" cy="35" r="${r}"/>
              <circle class="soc-arc"   cx="35" cy="35" r="${r}"
                      stroke-dasharray="${c}" stroke-dashoffset="${arc}"/>
            </svg>` : nothing}
          <ha-icon icon="${icon}"></ha-icon>
        </div>
        ${power != null ? html`<div class="node-power">${power}</div>` : nothing}
        ${sub ? html`<div class="node-sub">${sub}</div>` : nothing}
        <div class="node-label">${label}</div>
      </div>
    `;
  }

  _renderFlow() {
    const hass = this.hass;
    const c = this._config;

    // ---- Powers --------------------------------------------------------------
    const solarW = c.solar.total_power
      ? sectionPower(hass, c.solar, 'total_power')
      : (c.solar.mppts || []).reduce((a, m) => a + stateAsWatts(hass, m.power), 0);
    const batteryW = sectionPower(hass, c.battery);
    const gridW    = gridNetWatts(hass, c.grid);              // + = import, − = export
    const homeW    = sectionPower(hass, c.home);
    const evW      = sectionPower(hass, c.ev);
    const batterySoc = c.battery.soc ? stateNum(hass, c.battery.soc) : null;

    // ---- Daily totals --------------------------------------------------------
    const solarToday = c.solar.total_today ? stateAsKwh(hass, c.solar.total_today) : null;
    const batToday = c.battery.daily_charge ? stateAsKwh(hass, c.battery.daily_charge) : null;
    const batOutToday = c.battery.daily_discharge ? stateAsKwh(hass, c.battery.daily_discharge) : null;
    const impToday = c.grid.daily_import ? stateAsKwh(hass, c.grid.daily_import) : null;
    const expToday = c.grid.daily_export ? stateAsKwh(hass, c.grid.daily_export) : null;
    const homeToday = c.home.daily_energy ? stateAsKwh(hass, c.home.daily_energy) : null;
    const evSession = c.ev.session_energy ? stateAsKwh(hass, c.ev.session_energy) : null;

    // ---- Layout (percent coords; preserveAspectRatio="none" stretches SVG) --
    const mppts = (c.solar.mppts || []).filter(m => m && m.power);
    const showMppts = c.show_solar !== false && mppts.length > 0;
    const inv = { x: 50, y: 58 };
    const battery = { x: 50, y: 92 };
    const grid    = { x: 7,  y: 58 };
    const home    = { x: 75, y: 58 };
    const ev      = { x: 94, y: 58 };
    const solarFallback = { x: 50, y: 10 };

    const n = mppts.length;
    const mpptPos = mppts.map((_, i) => ({
      x: n === 1 ? 50 : 14 + ((72 / (n - 1)) * i),
      y: 10,
    }));

    // ---- Paths ---------------------------------------------------------------
    const mpptPaths = mpptPos.map((p, i) => {
      const d = `M ${p.x},${p.y + 6} C ${p.x},${inv.y - 16} ${inv.x},${inv.y - 16} ${inv.x},${inv.y - 6}`;
      return { id: `p-mppt-${i}`, d, w: stateAsWatts(hass, mppts[i].power), kind: 'solar' };
    });

    const paths = [
      ...mpptPaths,
      { id: 'p-solar-inv', d: `M ${solarFallback.x},${solarFallback.y + 6} L ${inv.x},${inv.y - 6}`, w: solarW, kind: 'solar', hide: showMppts },
      { id: 'p-grid-inv',  d: `M ${grid.x + 5},${grid.y} L ${inv.x - 6},${inv.y}`,                    w: gridW,    kind: 'grid' },
      { id: 'p-inv-batt',  d: `M ${inv.x},${inv.y + 6} L ${battery.x},${battery.y - 5}`,              w: batteryW, kind: 'battery' },
      { id: 'p-inv-home',  d: `M ${inv.x + 6},${inv.y} L ${home.x - 5},${home.y}`,                    w: homeW,    kind: 'home' },
      { id: 'p-home-ev',   d: `M ${home.x + 5},${home.y} L ${ev.x - 5},${ev.y}`,                      w: evW,      kind: 'ev' },
    ];

    const colorOf = (kind, w) => {
      switch (kind) {
        case 'grid':    return w >= 0 ? 'var(--so-grid)' : 'var(--so-grid-export)';
        case 'battery': return 'var(--so-battery)';
        case 'home':    return 'var(--so-home)';
        case 'ev':      return 'var(--so-ev)';
        default:        return 'var(--so-solar)';
      }
    };
    // Reverse-flow lines: power flowing AWAY from the inverter (export, discharge)
    const reverseOf = (kind, w) => (kind === 'grid' && w < 0) || (kind === 'battery' && w < 0);

    return html`
      <div class="flow-wrap">
        <svg class="flow-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            ${paths.map(p => svg`<path id="${p.id}" d="${p.d}"/>`)}
          </defs>
          ${paths.map(p => {
            if (p.hide) return nothing;
            const color = colorOf(p.kind, p.w);
            const dur = this._config.animate ? this._flowDur(p.w) : null;
            const active = dur != null;
            const reverse = reverseOf(p.kind, p.w);
            return svg`
              <use href="#${p.id}"
                   class="flow-line-bg"
                   vector-effect="non-scaling-stroke"
                   style="--line-color:${color};"/>
              <use href="#${p.id}"
                   class="flow-line ${active ? 'active' : 'idle'} ${reverse ? 'reverse' : ''}"
                   stroke="${color}"
                   vector-effect="non-scaling-stroke"
                   style="--line-color:${color}; --flow-dur:${dur || 0}s;"/>
            `;
          })}
        </svg>

        <div class="inverter-hub" style="left:${inv.x}%; top:${inv.y}%;"
             title="Inverter"
             @click=${() => this._click(c.inverter?.status || c.inverter?.temperature)}>
          <ha-icon icon="${c.inverter?.icon || 'mdi:sine-wave'}"></ha-icon>
          <div class="inv-label">INV</div>
        </div>

        ${showMppts ? mpptPos.map((p, i) => {
          const m = mppts[i];
          const w = stateAsWatts(hass, m.power);
          const max = numberOr(m.max_power, 0);
          return this._nodeEl({
            x: p.x, y: p.y,
            label: m.name || `PV${i + 1}`,
            icon: m.icon || 'mdi:solar-panel',
            color: 'var(--so-solar)',
            power: fmtPower(w, c.decimals_power),
            sub: max > 0 ? `${Math.round((w / max) * 100)}% · ${(max/1000).toFixed(1)} kW max` : nothing,
            entityId: m.power,
            small: true,
            active: w > 5,
          });
        }) : (c.show_solar !== false ? this._nodeEl({
          x: solarFallback.x, y: solarFallback.y,
          label: 'Solar',
          icon: 'mdi:solar-power',
          color: 'var(--so-solar)',
          power: fmtPower(solarW, c.decimals_power),
          sub: solarToday != null ? `${fmtEnergy(solarToday, c.decimals_energy)} today` : nothing,
          entityId: c.solar.total_power,
          active: solarW > 5,
        }) : nothing)}

        ${c.show_grid !== false ? this._nodeEl({
          x: grid.x, y: grid.y,
          label: gridW >= 0 ? 'Grid In' : 'Grid Out',
          icon: 'mdi:transmission-tower',
          color: gridW >= 0 ? 'var(--so-grid)' : 'var(--so-grid-export)',
          power: fmtPower(Math.abs(gridW), c.decimals_power),
          sub: (impToday != null || expToday != null)
            ? html`${impToday != null ? html`↓${fmtEnergy(impToday, c.decimals_energy)}` : ''}${impToday != null && expToday != null ? ' · ' : ''}${expToday != null ? html`↑${fmtEnergy(expToday, c.decimals_energy)}` : ''}`
            : nothing,
          entityId: c.grid.power || c.grid.power_import,
          active: Math.abs(gridW) > 5,
        }) : nothing}

        ${c.show_battery !== false ? this._nodeEl({
          x: battery.x, y: battery.y,
          label: 'Battery',
          icon: batteryW > 5 ? 'mdi:battery-charging' : (batteryW < -5 ? 'mdi:battery-arrow-down' : 'mdi:battery-high'),
          color: 'var(--so-battery)',
          power: fmtPower(Math.abs(batteryW), c.decimals_power),
          sub: (batToday != null || batOutToday != null)
            ? html`${batToday != null ? html`↑${fmtEnergy(batToday, c.decimals_energy)}` : ''}${batToday != null && batOutToday != null ? ' · ' : ''}${batOutToday != null ? html`↓${fmtEnergy(batOutToday, c.decimals_energy)}` : ''}`
            : nothing,
          entityId: c.battery.power || c.battery.soc,
          soc: batterySoc,
          active: Math.abs(batteryW) > 5,
        }) : nothing}

        ${c.show_home !== false ? this._nodeEl({
          x: home.x, y: home.y,
          label: 'Home',
          icon: 'mdi:home-lightning-bolt',
          color: 'var(--so-home)',
          power: fmtPower(homeW, c.decimals_power),
          sub: homeToday != null ? `${fmtEnergy(homeToday, c.decimals_energy)} today` : nothing,
          entityId: c.home.power,
          active: homeW > 5,
        }) : nothing}

        ${c.show_ev !== false && (c.ev.power || c.ev.soc || c.ev.session_energy) ? this._nodeEl({
          x: ev.x, y: ev.y,
          label: 'EV',
          icon: evW > 5 ? 'mdi:ev-station' : 'mdi:car-electric',
          color: 'var(--so-ev)',
          power: fmtPower(evW, c.decimals_power),
          sub: evSession != null ? `${fmtEnergy(evSession, c.decimals_energy)} session` : nothing,
          entityId: c.ev.power || c.ev.soc,
          soc: c.ev.soc ? stateNum(hass, c.ev.soc) : null,
          small: true,
          active: evW > 5,
        }) : nothing}
      </div>
    `;
  }

  // -------- Tiles -----------------------------------------------------------

  _solarTile() {
    const hass = this.hass, c = this._config;
    if (c.show_solar === false) return nothing;
    const today = c.solar.total_today ? stateAsKwh(hass, c.solar.total_today) : null;
    const predicted = c.solar.predicted_remaining_today ? stateAsKwh(hass, c.solar.predicted_remaining_today) : null;
    const predictedTotal = c.solar.predicted_today ? stateAsKwh(hass, c.solar.predicted_today) : null;
    const mppts = c.solar.mppts || [];

    return html`
      <div class="tile clickable" @click=${() => this._click(c.solar.total_today || c.solar.total_power)}>
        <div class="tile-head"><ha-icon icon="mdi:solar-power-variant"></ha-icon> Solar today</div>
        <div class="tile-value">${today != null ? fmtEnergy(today, c.decimals_energy) : '—'}</div>
        <div class="tile-sub">
          ${predicted != null ? html`<span>☀️ ${fmtEnergy(predicted, c.decimals_energy)} expected left</span>` : nothing}
          ${predictedTotal != null ? html`<span>📊 ${fmtEnergy(predictedTotal, c.decimals_energy)} forecast total</span>` : nothing}
        </div>
        ${mppts.length ? html`
          <div class="mppt-chips">
            ${mppts.map(m => {
              const w = stateAsWatts(hass, m.power);
              const max = numberOr(m.max_power, 0);
              const pct = max > 0 ? Math.round((w / max) * 100) : null;
              return html`<span class="chip" title=${m.power || ''}>${m.name || m.power}: ${fmtPower(w, 0)}${pct != null ? ` · ${pct}%` : ''}</span>`;
            })}
          </div>` : nothing}
      </div>
    `;
  }

  _batteryTile() {
    const hass = this.hass, c = this._config;
    if (c.show_battery === false) return nothing;
    const soc = c.battery.soc ? stateNum(hass, c.battery.soc) : null;
    const power = c.battery.power ? sectionPower(hass, c.battery) : null;
    const charge = c.battery.daily_charge ? stateAsKwh(hass, c.battery.daily_charge) : null;
    const discharge = c.battery.daily_discharge ? stateAsKwh(hass, c.battery.daily_discharge) : null;
    const cap = numberOr(c.battery.capacity_kwh, 0);
    const remaining = c.battery.remaining_kwh ? stateAsKwh(hass, c.battery.remaining_kwh) :
      (cap > 0 && soc != null ? cap * soc / 100 : null);
    const ttf = c.battery.time_to_full ? stateValue(hass, c.battery.time_to_full)?.state : null;
    const temp = c.battery.temperature ? stateValue(hass, c.battery.temperature) : null;

    const direction = power == null ? '' :
      power > 5 ? `Charging · ${fmtPower(power, c.decimals_power)}` :
      power < -5 ? `Discharging · ${fmtPower(Math.abs(power), c.decimals_power)}` :
      'Idle';

    return html`
      <div class="tile clickable" @click=${() => this._click(c.battery.soc || c.battery.power)}>
        <div class="tile-head"><ha-icon icon="mdi:battery-charging-high"></ha-icon> Battery</div>
        <div class="tile-value">${soc != null ? `${soc.toFixed(0)}%` : '—'}</div>
        <div class="bar"><span style="width:${soc ?? 0}%; background: var(--so-battery);"></span></div>
        <div class="tile-sub">
          <span>${direction}</span>
          ${remaining != null ? html`<span>🔋 ${fmtEnergy(remaining, c.decimals_energy)}${cap > 0 ? ` / ${fmtEnergy(cap, 1)}` : ''}</span>` : nothing}
          ${charge != null ? html`<span>⬆️ ${fmtEnergy(charge, c.decimals_energy)}</span>` : nothing}
          ${discharge != null ? html`<span>⬇️ ${fmtEnergy(discharge, c.decimals_energy)}</span>` : nothing}
          ${ttf ? html`<span>⏱ ${ttf}</span>` : nothing}
          ${temp ? html`<span>🌡 ${temp.state}${temp.attributes?.unit_of_measurement || '°'}</span>` : nothing}
        </div>
      </div>
    `;
  }

  _gridTile() {
    const hass = this.hass, c = this._config;
    if (c.show_grid === false) return nothing;
    const power = (c.grid.power || c.grid.power_import || c.grid.power_export) ? gridNetWatts(hass, c.grid) : null;
    const imp = c.grid.daily_import ? stateAsKwh(hass, c.grid.daily_import) : null;
    const exp = c.grid.daily_export ? stateAsKwh(hass, c.grid.daily_export) : null;
    const pbuy = c.grid.price_import ? stateValue(hass, c.grid.price_import) : null;
    const psell = c.grid.price_export ? stateValue(hass, c.grid.price_export) : null;
    const flowing = power == null ? '' :
      power > 5 ? `Importing ${fmtPower(power, c.decimals_power)}` :
      power < -5 ? `Exporting ${fmtPower(Math.abs(power), c.decimals_power)}` :
      'Idle';
    const color = power == null ? 'var(--so-grid)' : (power >= 0 ? 'var(--so-grid)' : 'var(--so-grid-export)');

    return html`
      <div class="tile clickable" @click=${() => this._click(c.grid.power)}>
        <div class="tile-head"><ha-icon icon="mdi:transmission-tower"></ha-icon> Grid</div>
        <div class="tile-value" style="color:${color};">${power != null ? fmtPower(Math.abs(power), c.decimals_power) : '—'}</div>
        <div class="tile-sub">
          <span>${flowing}</span>
          ${imp != null ? html`<span>⬇️ ${fmtEnergy(imp, c.decimals_energy)}</span>` : nothing}
          ${exp != null ? html`<span>⬆️ ${fmtEnergy(exp, c.decimals_energy)}</span>` : nothing}
          ${pbuy ? html`<span>💰 ${pbuy.state} ${pbuy.attributes?.unit_of_measurement || ''}</span>` : nothing}
          ${psell ? html`<span>📈 ${psell.state} ${psell.attributes?.unit_of_measurement || ''}</span>` : nothing}
        </div>
      </div>
    `;
  }

  _homeTile() {
    const hass = this.hass, c = this._config;
    if (c.show_home === false) return nothing;
    const power = c.home.power ? sectionPower(hass, c.home) : null;
    const today = c.home.daily_energy ? stateAsKwh(hass, c.home.daily_energy) : null;
    return html`
      <div class="tile clickable" @click=${() => this._click(c.home.power)}>
        <div class="tile-head"><ha-icon icon="mdi:home-lightning-bolt"></ha-icon> Home</div>
        <div class="tile-value" style="color: var(--so-home);">${power != null ? fmtPower(power, c.decimals_power) : '—'}</div>
        <div class="tile-sub">
          ${today != null ? html`<span>⚡ ${fmtEnergy(today, c.decimals_energy)} today</span>` : nothing}
        </div>
      </div>
    `;
  }

  _evTile() {
    const hass = this.hass, c = this._config;
    if (c.show_ev === false) return nothing;
    if (!c.ev.power && !c.ev.soc && !c.ev.session_energy) return nothing;
    const power = c.ev.power ? sectionPower(hass, c.ev) : null;
    const soc = c.ev.soc ? stateNum(hass, c.ev.soc) : null;
    const sess = c.ev.session_energy ? stateAsKwh(hass, c.ev.session_energy) : null;
    const status = c.ev.status ? stateValue(hass, c.ev.status)?.state : null;
    const charging = power != null && power > 5;
    return html`
      <div class="tile clickable" @click=${() => this._click(c.ev.power || c.ev.soc)}>
        <div class="tile-head"><ha-icon icon="mdi:car-electric"></ha-icon> EV ${status ? html`· <span style="text-transform:none;font-weight:600;">${status}</span>` : ''}</div>
        <div class="tile-value" style="color: var(--so-ev);">${power != null ? fmtPower(power, c.decimals_power) : (soc != null ? `${soc.toFixed(0)}%` : '—')}</div>
        ${soc != null ? html`
          <div class="bar"><span style="width:${soc}%; background: var(--so-ev);"></span></div>` : nothing}
        <div class="tile-sub">
          ${soc != null && power != null ? html`<span>🔋 ${soc.toFixed(0)}%</span>` : nothing}
          ${sess != null ? html`<span>🔌 ${fmtEnergy(sess, c.decimals_energy)} session</span>` : nothing}
          ${charging ? html`<span style="color: var(--so-ev); font-weight:600;">● Charging</span>` : nothing}
        </div>
      </div>
    `;
  }

  // -------- Render ----------------------------------------------------------

  render() {
    if (!this._config || !this.hass) return html``;
    const c = this._config;
    const hass = this.hass;

    const solarTodayW = c.solar.total_today ? stateAsKwh(hass, c.solar.total_today) : null;
    const solarPredW = c.solar.predicted_remaining_today ? stateAsKwh(hass, c.solar.predicted_remaining_today) : null;
    const batterySoc = c.battery.soc ? stateNum(hass, c.battery.soc) : null;
    const gridPrice = c.grid.price_import ? stateValue(hass, c.grid.price_import) : null;

    return html`
      <ha-card>
        <div class="header">
          <div>
            <div class="title">${c.title || DEFAULTS.title}</div>
            ${solarTodayW != null ? html`<div class="subtitle">${fmtEnergy(solarTodayW, c.decimals_energy)} produced today</div>` : nothing}
          </div>
          <div class="header-stats">
            ${solarPredW != null ? html`<span class="pill">☀️ ${fmtEnergy(solarPredW, c.decimals_energy)} expected</span>` : nothing}
            ${batterySoc != null ? html`<span class="pill battery">🔋 ${batterySoc.toFixed(0)}%</span>` : nothing}
            ${gridPrice ? html`<span class="pill grid">💰 ${gridPrice.state} ${gridPrice.attributes?.unit_of_measurement || ''}</span>` : nothing}
          </div>
        </div>

        ${this._renderFlow()}

        <div class="tiles">
          ${this._solarTile()}
          ${this._batteryTile()}
          ${this._gridTile()}
          ${this._homeTile()}
          ${this._evTile()}
        </div>
      </ha-card>
    `;
  }
}

customElements.define('solar-overview-card', SolarOverviewCard);

// --- Editor (lightweight, ha-form based) -----------------------------------

class SolarOverviewCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
    h3 {
      margin: 18px 0 6px;
      font-size: 0.95rem;
      color: var(--primary-text-color);
      border-top: 1px solid var(--divider-color);
      padding-top: 14px;
    }
    h3:first-of-type { border-top: none; padding-top: 0; }
    .mppt {
      display: grid;
      grid-template-columns: 1fr 1fr 90px auto;
      gap: 8px;
      align-items: end;
      margin-bottom: 8px;
    }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    ha-textfield, ha-entity-picker { width: 100%; }
    mwc-button { margin-top: 6px; }
  `;

  setConfig(config) {
    this._config = {
      ...DEFAULTS,
      ...config,
      solar: { mppts: [], ...(config.solar || {}) },
      battery: { ...(config.battery || {}) },
      grid: { ...(config.grid || {}) },
      home: { ...(config.home || {}) },
      ev: { ...(config.ev || {}) },
      inverter: { ...(config.inverter || {}) },
    };
  }

  _emit() {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  _setTop(key, value) {
    this._config = { ...this._config, [key]: value };
    this._emit();
  }

  _setSection(section, key, value) {
    this._config = {
      ...this._config,
      [section]: { ...this._config[section], [key]: value },
    };
    this._emit();
  }

  _entityPicker(label, section, key, domains = ['sensor', 'binary_sensor', 'switch', 'number', 'input_number']) {
    const value = section === null ? this._config[key] : this._config[section]?.[key];
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${value || ''}
        .label=${label}
        .includeDomains=${domains}
        allow-custom-entity
        @value-changed=${(e) => section === null ? this._setTop(key, e.detail.value) : this._setSection(section, key, e.detail.value)}>
      </ha-entity-picker>
    `;
  }

  _addMppt() {
    const mppts = [...(this._config.solar?.mppts || []), { name: '', power: '', max_power: 0 }];
    this._setSection('solar', 'mppts', mppts);
  }

  _removeMppt(i) {
    const mppts = [...(this._config.solar?.mppts || [])];
    mppts.splice(i, 1);
    this._setSection('solar', 'mppts', mppts);
  }

  _updateMppt(i, key, value) {
    const mppts = [...(this._config.solar?.mppts || [])];
    mppts[i] = { ...mppts[i], [key]: value };
    this._setSection('solar', 'mppts', mppts);
  }

  render() {
    if (!this._config || !this.hass) return html``;
    const c = this._config;
    return html`
      <h3>General</h3>
      <ha-textfield label="Title" .value=${c.title || ''} @input=${(e) => this._setTop('title', e.target.value)}></ha-textfield>
      <div class="row">
        <ha-textfield label="Decimals (power)" type="number" min="0" max="3" .value=${String(c.decimals_power ?? 0)} @input=${(e) => this._setTop('decimals_power', Number(e.target.value))}></ha-textfield>
        <ha-textfield label="Decimals (energy)" type="number" min="0" max="3" .value=${String(c.decimals_energy ?? 1)} @input=${(e) => this._setTop('decimals_energy', Number(e.target.value))}></ha-textfield>
      </div>
      <ha-formfield label="Animate flow">
        <ha-switch .checked=${c.animate !== false} @change=${(e) => this._setTop('animate', e.target.checked)}></ha-switch>
      </ha-formfield>

      <h3>Solar</h3>
      ${this._entityPicker('Total PV power', 'solar', 'total_power')}
      ${this._entityPicker('Total PV energy today', 'solar', 'total_today')}
      ${this._entityPicker('Forecast: remaining today', 'solar', 'predicted_remaining_today')}
      ${this._entityPicker('Forecast: total today', 'solar', 'predicted_today')}
      <h4>MPPT strings</h4>
      ${(c.solar.mppts || []).map((m, i) => html`
        <div class="mppt">
          <ha-textfield label="Name" .value=${m.name || ''} @input=${(e) => this._updateMppt(i, 'name', e.target.value)}></ha-textfield>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${m.power || ''}
            .label=${'Power entity'}
            .includeDomains=${['sensor']}
            allow-custom-entity
            @value-changed=${(e) => this._updateMppt(i, 'power', e.detail.value)}>
          </ha-entity-picker>
          <ha-textfield label="Max W" type="number" min="0" .value=${String(m.max_power ?? 0)} @input=${(e) => this._updateMppt(i, 'max_power', Number(e.target.value))}></ha-textfield>
          <mwc-button @click=${() => this._removeMppt(i)}>✕</mwc-button>
        </div>
      `)}
      <mwc-button raised @click=${() => this._addMppt()}>Add MPPT</mwc-button>

      <h3>Battery</h3>
      ${this._entityPicker('SOC (%)', 'battery', 'soc')}
      ${this._entityPicker('Power', 'battery', 'power')}
      <ha-formfield label="Invert power sign (flip charge / discharge direction)">
        <ha-switch .checked=${!!c.battery.invert} @change=${(e) => this._setSection('battery', 'invert', e.target.checked)}></ha-switch>
      </ha-formfield>
      ${this._entityPicker('Daily charge', 'battery', 'daily_charge')}
      ${this._entityPicker('Daily discharge', 'battery', 'daily_discharge')}
      ${this._entityPicker('Remaining energy', 'battery', 'remaining_kwh')}
      ${this._entityPicker('Time to full', 'battery', 'time_to_full')}
      ${this._entityPicker('Temperature', 'battery', 'temperature')}
      <ha-textfield label="Capacity (kWh)" type="number" min="0" step="0.1" .value=${String(c.battery.capacity_kwh ?? 0)} @input=${(e) => this._setSection('battery', 'capacity_kwh', Number(e.target.value))}></ha-textfield>

      <h3>Grid</h3>
      ${this._entityPicker('Net power (+ import / − export)', 'grid', 'power')}
      <ha-formfield label="Invert net power sign">
        <ha-switch .checked=${!!c.grid.invert} @change=${(e) => this._setSection('grid', 'invert', e.target.checked)}></ha-switch>
      </ha-formfield>
      <div style="font-size:.78rem;color:var(--secondary-text-color);margin:6px 0;">Or use separate sensors for import/export power (overrides net):</div>
      ${this._entityPicker('Power: import only', 'grid', 'power_import')}
      ${this._entityPicker('Power: export only', 'grid', 'power_export')}
      ${this._entityPicker('Daily import', 'grid', 'daily_import')}
      ${this._entityPicker('Daily export', 'grid', 'daily_export')}
      ${this._entityPicker('Import price', 'grid', 'price_import')}
      ${this._entityPicker('Export price', 'grid', 'price_export')}

      <h3>Home / Load</h3>
      ${this._entityPicker('Power', 'home', 'power')}
      <ha-formfield label="Invert power sign">
        <ha-switch .checked=${!!c.home.invert} @change=${(e) => this._setSection('home', 'invert', e.target.checked)}></ha-switch>
      </ha-formfield>
      ${this._entityPicker('Daily energy', 'home', 'daily_energy')}

      <h3>Inverter</h3>
      <ha-textfield label="Icon (e.g. mdi:sine-wave, mdi:flash, mdi:cog)" .value=${c.inverter?.icon || ''} @input=${(e) => this._setSection('inverter', 'icon', e.target.value)}></ha-textfield>
      ${this._entityPicker('Status', 'inverter', 'status', ['sensor', 'binary_sensor'])}
      ${this._entityPicker('Temperature', 'inverter', 'temperature')}

      <h3>EV Charger</h3>
      ${this._entityPicker('Charging power', 'ev', 'power')}
      <ha-formfield label="Invert power sign">
        <ha-switch .checked=${!!c.ev.invert} @change=${(e) => this._setSection('ev', 'invert', e.target.checked)}></ha-switch>
      </ha-formfield>
      ${this._entityPicker('Session energy', 'ev', 'session_energy')}
      ${this._entityPicker('Car SOC (%)', 'ev', 'soc')}
      ${this._entityPicker('Status', 'ev', 'status', ['sensor', 'binary_sensor', 'switch'])}
    `;
  }
}

customElements.define('solar-overview-card-editor', SolarOverviewCardEditor);

// Register with HA card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'solar-overview-card',
  name: 'Solar Overview Card',
  description: 'Material You styled solar / battery / grid / EV overview',
  preview: true,
  documentationURL: 'https://github.com/xprezz/solar-overview-card',
});
