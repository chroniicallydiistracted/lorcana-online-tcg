// Externalized interface strings (standard §28). Components never hardcode player-facing text.
// English is the only sourced catalog; other launch locales need sourced translations before use.
// 'en-XA' is a pseudolocale for long-string and diacritic testing.
export const en = {
  'action.close': 'Close',
  'action.cancel': 'Cancel',
  'action.retry': 'Retry connection',
  'action.clearSearch': 'Clear search',
  'action.increase': 'Increase',
  'action.decrease': 'Decrease',
  'action.inspect': 'Inspect {name}',
  'action.dismiss': 'Dismiss',
  'state.pending': 'Pending',
  'search.results': '{count, plural, =0 {No results} one {# result} other {# results}}',
  'notifications.label': 'Notifications',
  'navigation.primary': 'Primary',
  'navigation.menu': 'Menu',
  'navigation.current': 'Current',
  'navigation.account': 'Account menu for {name}',
  'frame.skip': 'Skip to room content',
  'demonstration.label': 'Demonstration: real cards; position, ownership and contents are invented.',
  'artworkSlot.label': 'Ink-form artwork slot: {name}',
  'notifications.count': '{count, plural, =0 {No new notifications} one {# new notification} other {# new notifications}}',
  'connection.connected': 'Connected',
  'connection.reconnecting': 'Reconnecting',
  'connection.resyncing': 'Resynchronizing',
  'connection.offline': 'Offline',
  'connection.versionMismatch': 'Update required',
  'connection.actionsPaused': 'Actions are paused until the connection is restored.',
  'connection.actionsAvailable': 'Actions are available.',
  'connection.actionsResync': 'Actions resume after the latest state is confirmed.',
  'connection.actionsUpdate': 'Update to continue. Your recoverable work is kept.',
  'ownership.owned': 'Owned',
  'ownership.unowned': 'Not owned',
  'ownership.unknown': 'Ownership unknown',
  'ownership.loading': 'Loading ownership',
  'ownership.unavailable': 'Ownership unavailable',
  'quantity.normal': 'Normal',
  'quantity.foil': 'Foil',
  'quantity.total': 'Total',
  'finish.normal': 'Normal printing',
  'finish.foil': 'Foil printing',
  'finish.foilMark': 'Foil',
  'image.unavailable': 'Image unavailable',
  'job.queued': 'Queued',
  'job.running': 'Running',
  'job.failed': 'Failed',
  'job.canceled': 'Canceled',
  'job.complete': 'Complete',
  'feedback.success': 'Success',
  'feedback.warning': 'Warning',
  'feedback.danger': 'Error',
  'feedback.information': 'Information',
  'inspector.printed': 'Printed text',
  'inspector.flavor': 'Flavor text',
  'inspector.modifiers': 'Current effects',
  'inspector.printing': 'Printing',
  'inspector.ownership': 'Ownership',
  'inspector.legality': 'Legality',
  'inspector.rulings': 'Rulings and sources',
  'inspector.readingMode': 'Reading mode',
  'inspector.set': 'Set',
  'inspector.number': 'Collector number',
  'inspector.rarity': 'Rarity',
  'inspector.artist': 'Artist',
  'inspector.language': 'Language',
  'deck.quantity': 'Quantity of {name}',
  'deck.costLabel': 'Cost',
  'filter.ink': 'Ink',
  'filter.cost': 'Cost',
  'filter.costExactly': 'Cost {cost}',
  'filter.costOrMore': 'Cost {cost} or more',
  'filter.type': 'Type',
  'filter.rarity': 'Rarity',
  'filter.set': 'Set',
  'filter.inkable': 'Inkability',
  'filter.classification': 'Classification',
  'filter.any': 'Any',
  'filter.reset': 'Reset filters',
  'filter.open': 'Filters',
  'filter.openActive': 'Filters ({count} active)',
  'filter.title': 'Filters',
  'filter.done': 'Done',
  'filter.show': '{count, plural, =0 {Show no results} one {Show # result} other {Show # results}}',
  'catalog.add': 'Add one {name}',
  'catalog.remove': 'Remove one {name}',
  'catalog.inDeck': '{count} in deck',
  'catalog.max': 'max',
  'catalog.atLimit': 'copy limit {max} reached',
  'catalog.loading': 'Loading the catalog',
  'deck.costGroup': 'Cost {cost}, {count, plural, one {# card} other {# cards}}',
  'deck.costHeading': 'Cost {cost}',
  'deck.copies': '{count, plural, one {# card} other {# cards}}',
  'deck.countLabel': '{count} of {size} cards',
  'deck.curveCost': 'Cost',
  'deck.curveCount': 'Cards',
  'validation.rules': 'Rules',
  'validation.ownership': 'Ownership',
  'validation.advice': 'Advice',
  'validation.problems': '{count, plural, one {# to resolve} other {# to resolve}}',
  'validation.clear': 'Nothing to resolve',
  'save.unsaved': 'Unsaved changes',
  'save.saving': 'Saving',
  'save.saved': 'Saved · revision {revision}',
  'save.conflict': 'Changed elsewhere',
  'import.summary': '{cards, plural, one {# card resolved.} other {# cards resolved.}}',
  'import.attention': '{lines, plural, =0 {Every line matched.} one {# line needs attention.} other {# lines need attention.}}',
  'import.resolved': 'Resolved',
  'import.unresolved': 'Not resolved',
  'import.matched': 'Matched {name}',
  'export.copy': 'Copy to clipboard',
  'export.copied': 'Copied',
  'export.copyFailed': 'Copy failed. Select the text and copy it.',
  'export.format': 'Format',
  'export.preview': 'Exported text',
  'ink.multicolor': 'Inks: {list}',
  'ink.amber': 'Amber',
  'ink.amethyst': 'Amethyst',
  'ink.emerald': 'Emerald',
  'ink.ruby': 'Ruby',
  'ink.sapphire': 'Sapphire',
  'ink.steel': 'Steel',
  'symbol.lore': 'Lore',
  'symbol.exert': 'Exert',
  'symbol.inkable': 'Inkable',
  'symbol.uninkable': 'Uninkable',
  'symbol.strength': 'Strength',
  'symbol.willpower': 'Willpower',
  'symbol.short.lore': 'Lore',
  'symbol.short.exert': 'Exert',
  'symbol.short.inkable': 'Ink',
  'symbol.short.uninkable': 'No ink',
  'symbol.short.strength': 'Str',
  'symbol.short.willpower': 'Will',
} as const;
export type MessageKey = keyof typeof en;
export type Catalog = Readonly<Record<MessageKey, string>>;

const PSEUDO: Record<string, string> = { a: 'à', e: 'é', i: 'ï', o: 'ö', u: 'ü', c: 'ç', n: 'ñ', A: 'Å', E: 'É', I: 'Ï', O: 'Ö', U: 'Ü', C: 'Ç', N: 'Ñ', y: 'ý', s: 'š', z: 'ž' };
/** Accented, about 40% longer text that keeps placeholders and plural syntax intact. */
export function pseudolocalize(text: string): string {
  let depth = 0, out = '';
  for (const char of text) {
    if (char === '{') depth++;
    out += depth % 2 === 0 ? PSEUDO[char] ?? char : char; // text, including plural option bodies; never placeholder names
    if (char === '}') depth--;
  }
  const pad = Math.ceil(text.replace(/\{[^}]*\}/g, '').length * 0.4);
  return `[${out}${' ·'.repeat(Math.max(1, Math.round(pad / 2)))}]`;
}
export const catalogs: Readonly<Record<string, Catalog>> = Object.freeze({
  en,
  'en-XA': Object.fromEntries(Object.entries(en).map(([k, v]) => [k, pseudolocalize(v)])) as Catalog,
});
export function catalogFor(locale: string): Catalog { return catalogs[locale] ?? en; }

/** Minimal ICU subset: {name} placeholders and {count, plural, =0 {...} one {...} other {...}} with # replacement. */
export function formatMessage(template: string, values: Readonly<Record<string, string | number>>, locale: string): string {
  const plural = /\{(\w+), plural, ((?:(?:=\d+|zero|one|two|few|many|other) \{[^{}]*\}\s*)+)\}/g;
  const withPlurals = template.replace(plural, (_all, name: string, body: string) => {
    const count = Number(values[name] ?? 0), options = new Map<string, string>();
    for (const m of body.matchAll(/(=\d+|zero|one|two|few|many|other) \{([^{}]*)\}/g)) options.set(m[1]!, m[2]!);
    const exact = options.get('=' + count), rule = new Intl.PluralRules(locale === 'en-XA' ? 'en' : locale).select(count);
    const chosen = exact ?? options.get(rule) ?? options.get('other') ?? '';
    return chosen.replace(/#/g, new Intl.NumberFormat(locale === 'en-XA' ? 'en' : locale).format(count));
  });
  return withPlurals.replace(/\{(\w+)\}/g, (_all, name: string) => {
    const value = values[name];
    return value === undefined ? '' : typeof value === 'number' ? new Intl.NumberFormat(locale === 'en-XA' ? 'en' : locale).format(value) : value;
  });
}
