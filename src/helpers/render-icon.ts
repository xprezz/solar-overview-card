import { svg } from 'lit';
import { Utils } from './utils';

/**
 * Renders a load icon with optional popup functionality and an optional
 * Material-You tonal "chip" background behind it.
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
	chipOpacity: number = 0.14,
) {
	if (!icon) return '';

	const chip = chipColor
		? svg`<rect x="${x}" y="${y}" width="${width}" height="${height}"
				rx="${Math.min(Number(width), Number(height)) / 2.4}"
				ry="${Math.min(Number(width), Number(height)) / 2.4}"
				fill="${chipColor}" opacity="${chipOpacity}"
				display="${show ? '' : 'none'}"/>`
		: svg``;

	const iconFo = svg`
		<foreignObject x="${x}" y="${y}" width="${width}" height="${height}" display="${show ? '' : 'none'}">
			<div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: ${width}px; height: ${height}px; display: flex; align-items: center; justify-content: center;">
				<ha-icon icon="${icon}" class="${className}"></ha-icon>
			</div>
		</foreignObject>`;

	if (entity) {
		return svg`
			<a href="#" @click=${(e) => Utils.handlePopup(e, entity)}>
				${chip}
				${iconFo}
			</a>`;
	}
	return svg`${chip}${iconFo}`;
}
