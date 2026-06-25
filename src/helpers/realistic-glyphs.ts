import { svg } from 'lit';

/**
 * Realistic inline-SVG glyphs (viewBox 0 0 24 24) intended to look like the
 * real-world object. All use currentColor so the outer capsule sets the tint.
 */

export const inverterGlyph = svg`
	<rect x="3" y="2" width="18" height="20" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
	<rect x="5.5" y="4.5" width="13" height="5.5" rx="1" fill="currentColor" opacity="0.18"/>
	<path d="M7 7.2 Q8.5 5.2 10 7.2 T13 7.2 T16 7.2 T19 7.2" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linecap="round"/>
	<circle cx="18" cy="19.5" r="0.9" fill="currentColor"/>
	<line x1="6" y1="13.5" x2="18" y2="13.5" stroke="currentColor" stroke-width="0.8" opacity="0.6" stroke-linecap="round"/>
	<line x1="6" y1="16" x2="18" y2="16" stroke="currentColor" stroke-width="0.8" opacity="0.6" stroke-linecap="round"/>
	<line x1="6" y1="18.5" x2="14" y2="18.5" stroke="currentColor" stroke-width="0.8" opacity="0.6" stroke-linecap="round"/>
`;
