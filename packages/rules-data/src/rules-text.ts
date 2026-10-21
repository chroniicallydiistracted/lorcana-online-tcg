/**
 * Presentation tokens for printed rules text. The catalog marks named abilities as `\Name\`, keywords as `<Keyword>`
 * and printed symbols as `{X}`; reminder text sits in parentheses. Tokens keep every character of the printed
 * wording, so `rulesTextSource(parseRulesText(text))` equals `normalizeRulesText(text)` exactly. This is for display and
 * search only: it never interprets an ability (blueprint §6.2).
 */
export type RulesSymbol = 'ink' | 'exert' | 'strength' | 'willpower' | 'lore' | 'inkwell';
export type RulesToken =
  | { readonly kind: 'text'; readonly text: string; readonly reminder: boolean }
  | { readonly kind: 'keyword'; readonly keyword: string; readonly reminder: boolean }
  | { readonly kind: 'ability'; readonly name: string }
  | { readonly kind: 'symbol'; readonly code: string; readonly symbol: RulesSymbol | null; readonly reminder: boolean }
  | { readonly kind: 'break' };
export interface RulesParagraph { readonly tokens: readonly RulesToken[] }

/** Printed symbol codes, confirmed against card images (Madam Mim – Hummingbird prints {C} as the inkwell mark). */
export const rulesSymbols: Readonly<Record<string, RulesSymbol>> = { I: 'ink', E: 'exert', S: 'strength', W: 'willpower', L: 'lore', C: 'inkwell' };
const closers: Readonly<Record<string, string>> = { '\\': '\\', '<': '>', '{': '}' };

/**
 * Line endings normalized to `\n`; paragraphs split on blank lines with their surrounding spaces removed. Older records
 * (84 English, over 1,100 in each other language on 2026-10-21) write breaks as `%`: before a `•` list item it is a
 * line break, as current records write it, and otherwise it separates paragraphs. Records with a broken ability mark
 * are fixed beforehand by the reviewed corrections in `corrections.ts`.
 */
export function normalizeRulesText(source: string): string {
  const breaks = source.replace(/\r\n?/g, '\n').replace(/[ \t]*%[ \t]*(?=•)/g, '\n').replace(/[ \t]*%[ \t]*/g, '\n\n');
  return breaks.split(/[ \t]*\n[ \t]*\n[ \t\n]*/).map(paragraph => paragraph.trim()).filter(Boolean).join('\n\n');
}
/** Flavour text with `%` (older records) and `\r\n` as the line break current records write before an attribution. */
export function normalizeFlavorText(source: string): string {
  return source.replace(/\r\n?/g, '\n').replace(/[ \t]*%[ \t]*/g, '\n').trim();
}

function parseParagraph(paragraph: string): RulesToken[] {
  const tokens: RulesToken[] = [];
  let depth = 0, text = '', textReminder = false;
  const flush = () => { if (text) tokens.push({ kind: 'text', text, reminder: textReminder }); text = ''; };
  const append = (value: string, reminder: boolean) => { if (text && textReminder !== reminder) flush(); textReminder = reminder; text += value; };
  for (let i = 0; i < paragraph.length; i++) {
    const char = paragraph.charAt(i), closer = closers[char];
    if (closer !== undefined) {
      const end = paragraph.indexOf(closer, i + 1);
      if (end > i + 1) {
        const inner = paragraph.slice(i + 1, end);
        flush();
        if (char === '\\') tokens.push({ kind: 'ability', name: inner });
        else if (char === '<') tokens.push({ kind: 'keyword', keyword: inner, reminder: depth > 0 });
        else tokens.push({ kind: 'symbol', code: inner, symbol: rulesSymbols[inner] ?? null, reminder: depth > 0 });
        i = end;
        continue;
      }
    }
    if (char === '\n') { flush(); tokens.push({ kind: 'break' }); continue; }
    if (char === '(') { depth++; append(char, true); continue; }
    if (char === ')' && depth > 0) { append(char, true); depth--; continue; }
    append(char, depth > 0);
  }
  flush();
  return tokens;
}

export function parseRulesText(source: string): readonly RulesParagraph[] {
  const normalized = normalizeRulesText(source);
  return normalized ? normalized.split('\n\n').map(paragraph => ({ tokens: parseParagraph(paragraph) })) : [];
}

/** The catalog's markup rebuilt from tokens; equals `normalizeRulesText` of the original. */
export function rulesTextSource(paragraphs: readonly RulesParagraph[]): string {
  return paragraphs.map(({ tokens }) => tokens.map(token => {
    switch (token.kind) {
      case 'text': return token.text;
      case 'keyword': return `<${token.keyword}>`;
      case 'ability': return `\\${token.name}\\`;
      case 'symbol': return `{${token.code}}`;
      case 'break': return '\n';
    }
  }).join('')).join('\n\n');
}
