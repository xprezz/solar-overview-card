import { svg } from 'lit';
import { Utils } from './utils';

/**
 * Apple Liquid Glass capsule behind any icon. The chipColor tints the
 * inner gradient subtly; backdrop-filter does the real glass work.
 */
function glassCapsuleStyle(width: number, height: number, chipColor?: string) {
	const tint = chipColor ?? 'rgba(255,255,255,0.35)';
	const min = Math.min(width, height);
	const radius = min / 2;
	return [
		`position:fixed`,
		`width:${width}px`,
		`height:${height}px`,
		`display:flex`,
		`align-items:center`,
		`justify-content:center`,
		`border-radius:${radius}px`,
		`background:radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 45%, ${tint} 100%)`,
		`backdrop-filter:blur(14px) saturate(180%)`,
		`-webkit-backdrop-filter:blur(14px) saturate(180%)`,
		`border:0.5px solid rgba(255,255,255,0.55)`,
		`box-shadow:0 1px 0 rgba(255,255,255,0.65) inset, 0 -1px 1px rgba(0,0,0,0.08) inset, 0 6px 18px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.08)`,
	].join(';');
}

/**
 * Renders a load icon with optional popup and optional Apple-Glass capsule.
 */
export function renderIcon(
	entity: string | undefined,
	icon: string | undefined,
	className: string,
	x: number | string,
	y: number | string,
	width: number = 30,
	height: number = 30,
	show: boolean = true,
	chipColor?: string,
	_chipOpacity: number = 0.14,
) {
	if (!icon) return '';

	const containerStyle = chipColor
		? glassCapsuleStyle(Number(width), Number(height), `${chipColor}40`)
		: `position:fixed;width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center`;

	const iconFo = svg`
		<foreignObject x="${x}" y="${y}" width="${width}" height="${height}" display="${show ? '' : 'none'}">
			<div xmlns="http://www.w3.org/1999/xhtml" style="${containerStyle}">
				<ha-icon icon="${icon}" class="${className}"></ha-icon>
			</div>
		</foreignObject>`;

	if (entity) {
		return svg`
			<a href="#" @click=${(e) => Utils.handlePopup(e, entity)}>
				${iconFo}
			</a>`;
	}
	return iconFo;
}

/**
 * Renders a custom inline SVG glyph inside a glass capsule. Use for icons
 * that need to look like the real-world object (e.g. inverter unit).
 */
export function renderGlassGlyph(
	entity: string | undefined,
	innerSvg: ReturnType<typeof svg>,
	x: number,
	y: number,
	width: number,
	height: number,
	tint: string,
	show: boolean = true,
) {
	const style = glassCapsuleStyle(width, height, `${tint}40`);
	const fo = svg`
		<foreignObject x="${x}" y="${y}" width="${width}" height="${height}" display="${show ? '' : 'none'}">
			<div xmlns="http://www.w3.org/1999/xhtml" style="${style}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					width="${width * 0.7}" height="${height * 0.7}"
					style="color:${tint}; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.18));">
					${innerSvg}
				</svg>
			</div>
		</foreignObject>`;
	if (entity) {
		return svg`<a href="#" @click=${(e) => Utils.handlePopup(e, entity)}>${fo}</a>`;
	}
	return fo;
}
