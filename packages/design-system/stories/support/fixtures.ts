import type { Printing } from '../../src/index.ts';

// Synthetic fixtures only (AGENTS.md): invented names, no official card text or art.
const neutralArt = (label: string) => 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 880"><rect width="630" height="880" fill="#eeeeee"/><rect x="30" y="30" width="570" height="820" fill="none" stroke="#777777" stroke-width="4"/><text x="315" y="450" font-family="sans-serif" font-size="40" text-anchor="middle" fill="#555555">${label}</text></svg>`); // token-exception: neutral fixture art
export const printing: Printing = { id: 'syn-001', name: 'Synthetic Explorer', version: 'Charted the Quiet Coast', inks: ['sapphire'], setCode: 'SYN', setName: 'Synthetic Set One', collectorNumber: '001/204', rarity: 'Rare', finish: 'normal', language: 'English', artist: 'Fixture Artist', image: { src: neutralArt('Synthetic Explorer'), width: 630, height: 880, alt: 'Neutral placeholder art for Synthetic Explorer' } };
export const foilPrinting: Printing = { ...printing, id: 'syn-001-f', finish: 'foil' };
export const longPrinting: Printing = { ...printing, id: 'syn-099', name: 'Exceptionally Long Synthetic Character Name For Wrapping', version: 'With An Equally Long Version Subtitle That Must Wrap', inks: ['amber', 'steel'], collectorNumber: '099/204', rarity: 'Super Rare' };
function withoutImage(source: Printing): Printing { const copy: { -readonly [K in keyof Printing]: Printing[K] } = { ...source }; delete copy.image; return copy; }
export const missingImage: Printing = { ...withoutImage(printing), id: 'syn-002', name: 'Synthetic Archivist', version: 'Keeper of Lost Pages', inks: ['amethyst'] };
export const brokenImage: Printing = { ...printing, id: 'syn-003', image: { src: '/missing-image.png', width: 630, height: 880, alt: 'Synthetic Explorer' } };
export const longText = 'This deliberately long synthetic sentence checks wrapping, reading measure and that nothing is silently truncated when the content is much longer than a typical label in the interface.';
