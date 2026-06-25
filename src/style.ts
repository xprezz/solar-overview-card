import { CSSResultGroup, css, html } from 'lit';

export const styles: CSSResultGroup = css`
	:host {
		--sov-radius: 24px;
		--sov-font: 'Google Sans Text', 'Google Sans', Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif;
		--sov-font-numeric: 'Google Sans', Roboto, system-ui, sans-serif;
		--sov-icon-shadow: 0 1px 2px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.08);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		padding: 8px;
		font-family: var(--sov-font);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.card {
		border-radius: var(--ha-card-border-radius, var(--sov-radius));
		box-shadow: var(
			--ha-card-box-shadow,
			0 1px 2px rgba(0, 0, 0, 0.06),
			0 4px 12px rgba(0, 0, 0, 0.08)
		);
		background: var(--ha-card-background, var(--card-background-color, white));
		border-width: var(--ha-card-border-width);
		padding: 4px;
		transition: box-shadow 200ms ease;
	}

	svg ha-icon {
		filter: drop-shadow(var(--sov-icon-shadow));
		transition: transform 200ms ease, filter 200ms ease;
	}

	svg a:hover ha-icon {
		transform: scale(1.06);
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.22)) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.12));
	}

	svg path[d],
	svg image {
		transition: filter 200ms ease;
	}

	text {
		text-anchor: middle;
		dominant-baseline: middle;
		font-family: var(--sov-font-numeric);
		font-feature-settings: 'tnum' 1, 'ss01' 1;
		letter-spacing: 0.01em;
	}

	.left-align {
		text-anchor: start;
	}
	.right-align {
		text-anchor: end;
	}
	.st1 {
		fill: #ff9b30;
	}
	.st2 {
		fill: #f3b3ca;
	}
	.st3 {
		font-size: 9px;
		font-weight: 500;
	}
	.st4 {
		font-size: 14px;
		font-weight: 500;
	}
	.st5 {
		fill: #969696;
	}
	.st6 {
		fill: #5fb6ad;
	}
	.st7 {
		fill: #5490c2;
	}
	.st8 {
		font-weight: 600;
	}
	.st9 {
		fill: #959595;
	}
	.st10 {
		font-size: 16px;
		font-weight: 600;
	}
	.st11 {
		fill: transparent;
	}
	.st12 {
		display: none;
	}
	.st13 {
		font-size: 22px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.st14 {
		font-size: 12px;
		font-weight: 500;
	}
	.remaining-energy {
		font-size: 9px;
		font-weight: 500;
		opacity: 0.85;
	}
`;

export const getDynamicStyles = (data) => html`
	<style>
		.essload1-icon {
			color: ${data.dynamicColourEssentialLoad1} !important;
			--mdc-icon-size: 32px;
		}

		.essload2-icon {
			color: ${data.dynamicColourEssentialLoad2} !important;
			--mdc-icon-size: 32px;
		}

		.essload1-small-icon {
			color: ${data.dynamicColourEssentialLoad1} !important;
			--mdc-icon-size: 20px;
		}

		.essload2-small-icon {
			color: ${data.dynamicColourEssentialLoad2} !important;
			--mdc-icon-size: 20px;
		}

		.essload3-small-icon {
			color: ${data.dynamicColourEssentialLoad3} !important;
			--mdc-icon-size: 20px;
		}

		.essload4-small-icon {
			color: ${data.dynamicColourEssentialLoad4} !important;
			--mdc-icon-size: 20px;
		}

		.essload5-small-icon {
			color: ${data.dynamicColourEssentialLoad5} !important;
			--mdc-icon-size: 20px;
		}

		.essload6-small-icon {
			color: ${data.dynamicColourEssentialLoad6} !important;
			--mdc-icon-size: 20px;
		}

		.grid-icon {
			color: ${data.customGridIconColour} !important;
			--mdc-icon-size: 64px;
		}

		.essload1-icon-full {
			color: ${data.dynamicColourEssentialLoad1} !important;
			--mdc-icon-size: 36px;
		}

		.aux-icon {
			color: ${data.auxDynamicColour} !important;
			--mdc-icon-size: 70px;
		}

		.aux-small-icon-1 {
			color: ${data.auxDynamicColourLoad1} !important;
			--mdc-icon-size: 24px;
		}

		.aux-small-icon-2 {
			color: ${data.auxDynamicColourLoad2} !important;
			--mdc-icon-size: 24px;
		}

		.aux-off-icon {
			color: ${data.auxOffColour} !important;
			--mdc-icon-size: 70px;
		}

		.nonessload1-icon {
			color: ${data.dynamicColourNonEssentialLoad1} !important;
			--mdc-icon-size: 32px;
		}

		.nonessload2-icon {
			color: ${data.dynamicColourNonEssentialLoad2} !important;
			--mdc-icon-size: 32px;
		}

		.nonessload3-icon {
			color: ${data.dynamicColourNonEssentialLoad3} !important;
			--mdc-icon-size: 32px;
		}

		.noness-icon {
			color: ${data.gridColour} !important;
			--mdc-icon-size: 70px;
		}

		.grid-icon-small {
			color: ${data.customGridIconColour} !important;
			--mdc-icon-size: 32px;
		}

		.inverter-icon {
			color: ${data.inverterColour} !important;
			--mdc-icon-size: 54px;
		}

		.inverter-icon-small {
			color: ${data.inverterColour} !important;
			--mdc-icon-size: 44px;
		}
	</style>
`;
