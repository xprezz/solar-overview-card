/**
 * Solar Overview Card
 * A Material You inspired solar / battery / grid / EV overview card for Home Assistant.
 *
 * Repository: https://github.com/chmors_microsoft/solar-overview-card
 * License: MIT
 */

import { LitElement, html, css, svg, nothing } from 'lit';

const CARD_VERSION = '0.1.0';

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

    .flow {
      width: 100%;
      height: auto;
      display: block;
      margin: 4px auto 10px;
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

  _flowDot(pathId, power, color, reverse = false) {
    if (!this._config.animate) return nothing;
    const w = Math.abs(power);
    if (w < 5) return nothing;
    // 1.5s (slow) .. 0.4s (fast) based on power (cap at 8 kW)
    const dur = Math.max(0.4, 1.5 - Math.min(w, 8000) / 8000 * 1.1).toFixed(2);
    return svg`
      <circle r="4" fill="${color}">
        <animateMotion dur="${dur}s" repeatCount="indefinite" keyPoints="${reverse ? '1;0' : '0;1'}" keyTimes="0;1">
          <mpath href="#${pathId}"/>
        </animateMotion>
      </circle>`;
  }

  _node(x, y, label, value, color, entityId, iconPath) {
    const sub = value ?? '';
    return svg`
      <g class="${entityId ? 'clickable' : ''}" @click=${() => this._click(entityId)}>
        <circle cx="${x}" cy="${y}" r="34" fill="color-mix(in srgb, ${color} 14%, transparent)" stroke="${color}" stroke-width="2"/>
        <path transform="translate(${x - 12}, ${y - 18}) scale(1)" d="${iconPath}" fill="${color}"/>
        <text x="${x}" y="${y + 12}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--so-on-surface)">${sub}</text>
        <text x="${x}" y="${y + 56}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--so-on-surface-variant)">${label}</text>
      </g>`;
  }

  _renderFlow() {
    const hass = this.hass;
    const c = this._config;

    const solarW = c.solar.total_power ? stateAsWatts(hass, c.solar.total_power) :
      (c.solar.mppts || []).reduce((a, m) => a + stateAsWatts(hass, m.power), 0);
    const batteryW = c.battery.power ? stateAsWatts(hass, c.battery.power) : 0; // + = charging
    const gridW = c.grid.power ? stateAsWatts(hass, c.grid.power) : 0; // + = import
    const homeW = c.home.power ? stateAsWatts(hass, c.home.power) : 0;
    const evW = c.ev.power ? stateAsWatts(hass, c.ev.power) : 0;

    // Layout in 700x340 viewBox
    const W = 700, H = 340;
    const cx = W / 2, cy = H / 2;
    const solar = { x: cx, y: 60 };
    const grid = { x: 80, y: cy };
    const battery = { x: cx, y: H - 60 };
    const home = { x: W - 200, y: cy };
    const ev = { x: W - 60, y: cy };

    const ICON_SUN = 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.41-1.41M4.93 19.07l1.41-1.41m12.73 0l1.41 1.41M4.93 4.93l1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z';
    const ICON_BOLT = 'M11 21l8-12h-6l2-8L7 13h6l-2 8z';
    const ICON_BATT = 'M7 4h4V2h2v2h4a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z';
    const ICON_HOME = 'M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z';
    const ICON_CAR = 'M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11m-14 0h14m-14 0v6h2v1a1 1 0 002 0v-1h6v1a1 1 0 002 0v-1h2v-6';

    return html`
      <svg class="flow" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="p-solar-inv" d="M ${solar.x},${solar.y + 34} C ${solar.x},${cy - 40} ${cx},${cy - 20} ${cx},${cy}"/>
          <path id="p-grid-inv" d="M ${grid.x + 34},${grid.y} C ${cx - 80},${cy} ${cx - 40},${cy} ${cx},${cy}"/>
          <path id="p-inv-batt" d="M ${cx},${cy} C ${cx},${cy + 40} ${battery.x},${battery.y - 60} ${battery.x},${battery.y - 34}"/>
          <path id="p-inv-home" d="M ${cx},${cy} C ${cx + 60},${cy} ${home.x - 60},${home.y} ${home.x - 34},${home.y}"/>
          <path id="p-home-ev" d="M ${home.x + 34},${home.y} L ${ev.x - 34},${ev.y}"/>
        </defs>

        <!-- Inverter hub -->
        <circle cx="${cx}" cy="${cy}" r="26" fill="var(--so-surface-2)" stroke="var(--so-outline)" stroke-width="1.5"/>
        <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--so-on-surface-variant)">INV</text>

        <!-- Lines -->
        <use href="#p-solar-inv" stroke="${'var(--so-solar)'}" stroke-width="2.5" fill="none" opacity="${solarW > 5 ? 1 : 0.25}"/>
        <use href="#p-grid-inv" stroke="${gridW >= 0 ? 'var(--so-grid)' : 'var(--so-grid-export)'}" stroke-width="2.5" fill="none" opacity="${Math.abs(gridW) > 5 ? 1 : 0.25}"/>
        <use href="#p-inv-batt" stroke="${'var(--so-battery)'}" stroke-width="2.5" fill="none" opacity="${Math.abs(batteryW) > 5 ? 1 : 0.25}"/>
        <use href="#p-inv-home" stroke="${'var(--so-home)'}" stroke-width="2.5" fill="none" opacity="${homeW > 5 ? 1 : 0.25}"/>
        <use href="#p-home-ev" stroke="${'var(--so-ev)'}" stroke-width="2.5" fill="none" opacity="${evW > 5 ? 1 : 0.25}"/>

        <!-- Animated dots -->
        ${this._flowDot('p-solar-inv', solarW, 'var(--so-solar)')}
        ${this._flowDot('p-grid-inv', gridW, gridW >= 0 ? 'var(--so-grid)' : 'var(--so-grid-export)', gridW < 0)}
        ${this._flowDot('p-inv-batt', batteryW, 'var(--so-battery)', batteryW < 0)}
        ${this._flowDot('p-inv-home', homeW, 'var(--so-home)')}
        ${this._flowDot('p-home-ev', evW, 'var(--so-ev)')}

        <!-- Nodes -->
        ${c.show_solar !== false ? this._node(solar.x, solar.y, 'Solar', fmtPower(solarW, c.decimals_power), 'var(--so-solar)', c.solar.total_power, ICON_SUN) : nothing}
        ${c.show_grid !== false ? this._node(grid.x, grid.y, gridW >= 0 ? 'Grid In' : 'Grid Out', fmtPower(Math.abs(gridW), c.decimals_power), gridW >= 0 ? 'var(--so-grid)' : 'var(--so-grid-export)', c.grid.power, ICON_BOLT) : nothing}
        ${c.show_battery !== false ? this._node(battery.x, battery.y, 'Battery', fmtPower(Math.abs(batteryW), c.decimals_power), 'var(--so-battery)', c.battery.power, ICON_BATT) : nothing}
        ${c.show_home !== false ? this._node(home.x, home.y, 'Home', fmtPower(homeW, c.decimals_power), 'var(--so-home)', c.home.power, ICON_HOME) : nothing}
        ${c.show_ev !== false && (c.ev.power || c.ev.soc) ? this._node(ev.x, ev.y, 'EV', fmtPower(evW, c.decimals_power), 'var(--so-ev)', c.ev.power, ICON_CAR) : nothing}
      </svg>
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
    const power = c.battery.power ? stateAsWatts(hass, c.battery.power) : null;
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
    const power = c.grid.power ? stateAsWatts(hass, c.grid.power) : null;
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
    const power = c.home.power ? stateAsWatts(hass, c.home.power) : null;
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
    const power = c.ev.power ? stateAsWatts(hass, c.ev.power) : null;
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
      ${this._entityPicker('Daily charge', 'battery', 'daily_charge')}
      ${this._entityPicker('Daily discharge', 'battery', 'daily_discharge')}
      ${this._entityPicker('Remaining energy', 'battery', 'remaining_kwh')}
      ${this._entityPicker('Time to full', 'battery', 'time_to_full')}
      ${this._entityPicker('Temperature', 'battery', 'temperature')}
      <ha-textfield label="Capacity (kWh)" type="number" min="0" step="0.1" .value=${String(c.battery.capacity_kwh ?? 0)} @input=${(e) => this._setSection('battery', 'capacity_kwh', Number(e.target.value))}></ha-textfield>

      <h3>Grid</h3>
      ${this._entityPicker('Power (+ import)', 'grid', 'power')}
      ${this._entityPicker('Daily import', 'grid', 'daily_import')}
      ${this._entityPicker('Daily export', 'grid', 'daily_export')}
      ${this._entityPicker('Import price', 'grid', 'price_import')}
      ${this._entityPicker('Export price', 'grid', 'price_export')}

      <h3>Home / Load</h3>
      ${this._entityPicker('Power', 'home', 'power')}
      ${this._entityPicker('Daily energy', 'home', 'daily_energy')}

      <h3>EV Charger</h3>
      ${this._entityPicker('Charging power', 'ev', 'power')}
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
  documentationURL: 'https://github.com/chmors_microsoft/solar-overview-card',
});
