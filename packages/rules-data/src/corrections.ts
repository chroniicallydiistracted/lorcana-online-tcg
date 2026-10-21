/**
 * Reviewed markup corrections for Ravensburger records that lost a named ability's `\` delimiter. Each one changes
 * markup only, never the printed words, applies only where `find` occurs exactly once, and cites the evidence: the
 * same printing's records in the other catalog languages. Found by the full-catalog audit on 2026-10-21; the audit
 * fails when a correction stops matching, so it is removed once Ravensburger fixes the record.
 */
export interface RulesTextCorrection { readonly id: string; readonly printingId: number; readonly find: string; readonly replace: string; readonly evidence: string }

export const rulesTextCorrections: readonly RulesTextCorrection[] = [
  { id: 'rb-699-en-tab', printingId: 699, find: '\n\tWait For Me!\\', replace: '\n\n\\Wait For Me!\\', evidence: 'A tab stands where the opening \\ belongs; the German, French and Italian records open the ability with \\ after a paragraph break.' },
  { id: 'rb-222-open', printingId: 222, find: 'Odd One Out\\', replace: '\\Odd One Out\\', evidence: 'Opening \\ missing in English (also served in the Italian catalog); the French record opens it.' },
  { id: 'rb-222-de-open', printingId: 222, find: 'Sonderling\\', replace: '\\Sonderling\\', evidence: 'Opening \\ missing in German; the French record opens it.' },
  { id: 'rb-226-open', printingId: 226, find: 'There\'s Trouble A-Brewin\'\\', replace: '\\There\'s Trouble A-Brewin\'\\', evidence: 'Opening \\ missing in English (also served in the Italian catalog); the French and German records open it.' },
  { id: 'rb-238-open', printingId: 238, find: 'Ah-choo!\\', replace: '\\Ah-choo!\\', evidence: 'Opening \\ missing in English (also served in the Italian catalog); the French and German records open it.' },
  { id: 'rb-240-open', printingId: 240, find: 'How Do You Do?\\', replace: '\\How Do You Do?\\', evidence: 'Opening \\ missing in English (also served in the Italian catalog); the French and German records open it.' },
  { id: 'rb-105-fr-open', printingId: 105, find: 'IMPROVISE\\', replace: '\\IMPROVISE\\', evidence: 'Opening \\ missing in French; the English and German records open it.' },
  { id: 'rb-207-fr-inner', printingId: 207, find: '\\GEL \\INTENSE\\', replace: '\\GEL INTENSE\\', evidence: 'A stray \\ inside the French ability name; the English and German records have one name between two marks.' },
  { id: 'rb-383-fr-open', printingId: 383, find: 'Le meilleur gumbo que j\'ai jamais goûté\\', replace: '\\Le meilleur gumbo que j\'ai jamais goûté\\', evidence: 'Opening \\ missing in French; the English and German records open it.' },
];

/** Applies the corrections for one printing. Returns the corrected markup and the ids that applied. */
export function correctRulesText(printingId: number, rulesText: string): { readonly text: string; readonly applied: readonly string[] } {
  let text = rulesText;
  const applied: string[] = [];
  for (const correction of rulesTextCorrections) {
    if (correction.printingId !== printingId || text.split(correction.find).length !== 2) continue;
    text = text.replace(correction.find, correction.replace);
    applied.push(correction.id);
  }
  return { text, applied };
}
