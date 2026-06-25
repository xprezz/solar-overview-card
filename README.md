# Solar Overview Card

A clean, **Material You** inspired Lovelace card for Home Assistant that visualizes your solar, battery, grid, home and EV charger in one place — with animated power flows, predicted solar production and per-MPPT breakdowns.

![Solar Overview Card preview](https://raw.githubusercontent.com/xprezz/solar-overview-card/main/docs/preview.png)

## Features

- 🌞 Animated SVG power flow (Solar ↔ Inverter ↔ Battery / Grid / Home / EV)
- 🔋 Battery tile with SOC bar, daily charge/discharge, remaining energy, time to full
- ⚡ Per-MPPT chips with name, current production and % of max
- ☀️ Optional **forecast remaining today** & **forecast total today** (Solcast, Forecast.Solar…)
- 🚗 EV charger tile: current draw, session energy, optional car SOC bar, status
- 💰 Optional dynamic electricity price pills (e.g. Stromligning)
- 🎨 Material 3 / Material You styling, light + dark, soft surfaces, pill chips
- 🛠 Built-in visual editor — pick every entity from a dropdown, no YAML required

## Installation

### HACS (recommended)

1. HACS → **⋮ → Custom repositories**
2. Add `https://github.com/xprezz/solar-overview-card` as type **Lovelace**
3. Install **Solar Overview Card**, then refresh
4. Add the card via the dashboard "Add card" menu (look for *Solar Overview Card*)

### Manual

Copy `dist/solar-overview-card.js` into `<config>/www/` and add a resource:

```yaml
url: /local/solar-overview-card.js
type: module
```

## Example configuration

Drop-in replacement for the Sunsynk power flow card, mapped to the example entities from the original Solis setup:

```yaml
type: custom:solar-overview-card
title: Home Energy
decimals_power: 0
decimals_energy: 1
animate: true

solar:
  total_power: sensor.solis_total_pv_power
  total_today: sensor.solis_pv_today_energy_generation
  predicted_remaining_today: sensor.solcast_pv_forecast_south_west_forecast_remaining_today
  predicted_today: sensor.solcast_pv_forecast_forecast_today    # optional
  mppts:
    - name: South
      power: sensor.solis_pv_power_1
      max_power: 2840
    - name: West
      power: sensor.solis_pv_power_2
      max_power: 4402
    - name: North
      power: sensor.solis_pv_power_3
      max_power: 2840
    - name: East
      power: sensor.solis_pv_power_4
      max_power: 5264

battery:
  soc: sensor.solis_battery_soc
  power: sensor.solis_battery_power
  daily_charge: sensor.solis_today_battery_charge_energy
  daily_discharge: sensor.solis_today_battery_discharge_energy
  temperature: sensor.pylontech_battery_temperature
  capacity_kwh: 25.6

grid:
  power: sensor.solis_meter_total_active_power
  daily_import: sensor.solis_today_energy_imported_from_grid
  daily_export: sensor.solis_today_energy_fed_into_grid
  price_import: sensor.stromligning_current_price_vat
  price_export: sensor.solar_real_sales_price

home:
  power: sensor.solis_household_load_power
  daily_energy: sensor.solis_today_energy_consumption

ev:
  power: sensor.toadhall_charger_power
  session_energy: sensor.toadhall_charger_session_energy
  status: switch.toadhall_charger_charger_enabled
  # soc: sensor.my_car_battery_soc        # optional, if your car integration exposes SOC
```

## Configuration reference

| Option | Type | Description |
| --- | --- | --- |
| `title` | string | Card header title |
| `decimals_power` | int | Decimals for W / kW values |
| `decimals_energy` | int | Decimals for kWh values |
| `animate` | bool | Animate the flow dots |
| `show_solar` / `show_battery` / `show_grid` / `show_home` / `show_ev` | bool | Hide individual sections |
| `solar.total_power` | entity | Total instantaneous PV power |
| `solar.total_today` | entity | Today's PV energy |
| `solar.predicted_remaining_today` | entity | Forecast energy remaining today |
| `solar.predicted_today` | entity | Forecast total today |
| `solar.mppts[]` | list | `{name, power, max_power}` per string |
| `battery.soc` | entity | Battery state of charge (%) |
| `battery.power` | entity | Battery power (+ charging, − discharging) |
| `battery.daily_charge` / `daily_discharge` | entity | Daily energy counters |
| `battery.remaining_kwh` | entity | Optional remaining energy sensor |
| `battery.time_to_full` | entity | Optional ETA sensor |
| `battery.temperature` | entity | Optional temperature sensor |
| `battery.capacity_kwh` | number | Total capacity (kWh) — used when no remaining_kwh sensor |
| `grid.power` | entity | Grid power (+ import, − export) |
| `grid.daily_import` / `daily_export` | entity | Daily energy counters |
| `grid.price_import` / `price_export` | entity | Dynamic price sensors |
| `home.power` / `home.daily_energy` | entity | Household load |
| `ev.power` | entity | EV charger instantaneous power |
| `ev.session_energy` | entity | EV session kWh |
| `ev.soc` | entity | Car SOC (%) — shown as bar if provided |
| `ev.status` | entity | Status/enabled sensor or switch |

All `power`/`energy` entities can report in **W or kW** / **Wh or kWh** — the card converts automatically.

## Theming

Override colors with CSS variables in your theme:

```yaml
solar_overview_solar_color: "#f5a524"
solar_overview_battery_color: "#ec88c0"
solar_overview_grid_color: "#ef4444"
solar_overview_grid_export_color: "#22c55e"
solar_overview_home_color: "#14b8a6"
solar_overview_ev_color: "#6366f1"
```

## Development

```bash
npm install
npm run build      # produces dist/solar-overview-card.js
npm run watch
```

## License

MIT
