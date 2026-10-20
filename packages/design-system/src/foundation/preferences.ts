// Versioned preference model (standard §31). Account and device scoping belong to the owning service;
// this module only defines, validates and safely stores non-sensitive device preferences.
export const PREFERENCES_VERSION = 1;
export type ThemePreference = 'system' | 'paper' | 'ink';
export type DensityPreference = 'comfortable' | 'compact';
export type DensitySurface = 'collection' | 'decks' | 'analysis';
export type MotionPreference = 'system' | 'reduced';
export type CollectionView = 'binder' | 'grid' | 'list';
export type RenderingQuality = 'automatic' | 'flat' | 'low' | 'standard' | 'enhanced';

export interface Preferences {
  readonly version: typeof PREFERENCES_VERSION;
  readonly theme: ThemePreference;
  readonly density: DensityPreference;
  readonly densityOverrides: Readonly<Partial<Record<DensitySurface, DensityPreference>>>;
  readonly collectionView: CollectionView;
  readonly collectionSort: 'set-collector';
  readonly inspectorReadingMode: boolean;
  readonly confirmQuestAll: boolean;
  readonly confirmEndTurn: boolean;
  readonly additionalConfirmations: boolean;
  readonly autoPass: boolean;
  readonly motion: MotionPreference;
  readonly animationSpeed: number;
  readonly renderingQuality: RenderingQuality;
  readonly deferNotificationsDuringPlay: boolean;
  readonly masterAudio: boolean;
  readonly music: boolean;
  readonly ambience: boolean;
  readonly gameplayCues: boolean;
}

/** Initial defaults exactly as the standard's §31 table. */
export const defaultPreferences: Preferences = Object.freeze({
  version: PREFERENCES_VERSION,
  theme: 'system',
  density: 'comfortable',
  densityOverrides: Object.freeze({}),
  collectionView: 'binder',
  collectionSort: 'set-collector',
  inspectorReadingMode: false,
  confirmQuestAll: true,
  confirmEndTurn: true,
  additionalConfirmations: false,
  autoPass: false,
  motion: 'system',
  animationSpeed: 1,
  renderingQuality: 'automatic',
  deferNotificationsDuringPlay: true,
  masterAudio: false,
  music: false,
  ambience: false,
  gameplayCues: false,
});

export const ANIMATION_SPEED_RANGE = Object.freeze({ min: 0.5, max: 2 });
const oneOf = <T extends string>(value: unknown, options: readonly T[], fallback: T): T => typeof value === 'string' && (options as readonly string[]).includes(value) ? value as T : fallback;
const flag = (value: unknown, fallback: boolean): boolean => typeof value === 'boolean' ? value : fallback;

/** Parse stored or synced preferences. Unknown fields are dropped and invalid fields keep their defaults. */
export function parsePreferences(value: unknown): Preferences {
  const d = defaultPreferences;
  if (!value || typeof value !== 'object' || Array.isArray(value)) return d;
  const v = value as Record<string, unknown>;
  if (v.version !== PREFERENCES_VERSION) return d;
  const overrides: Partial<Record<DensitySurface, DensityPreference>> = {};
  if (v.densityOverrides && typeof v.densityOverrides === 'object' && !Array.isArray(v.densityOverrides)) {
    for (const surface of ['collection', 'decks', 'analysis'] as const) {
      const choice = (v.densityOverrides as Record<string, unknown>)[surface];
      if (choice === 'comfortable' || choice === 'compact') overrides[surface] = choice;
    }
  }
  const speed = typeof v.animationSpeed === 'number' && Number.isFinite(v.animationSpeed) && v.animationSpeed >= ANIMATION_SPEED_RANGE.min && v.animationSpeed <= ANIMATION_SPEED_RANGE.max ? v.animationSpeed : d.animationSpeed;
  return Object.freeze({
    version: PREFERENCES_VERSION,
    theme: oneOf(v.theme, ['system', 'paper', 'ink'] as const, d.theme),
    density: oneOf(v.density, ['comfortable', 'compact'] as const, d.density),
    densityOverrides: Object.freeze(overrides),
    collectionView: oneOf(v.collectionView, ['binder', 'grid', 'list'] as const, d.collectionView),
    collectionSort: 'set-collector',
    inspectorReadingMode: flag(v.inspectorReadingMode, d.inspectorReadingMode),
    confirmQuestAll: flag(v.confirmQuestAll, d.confirmQuestAll),
    confirmEndTurn: flag(v.confirmEndTurn, d.confirmEndTurn),
    additionalConfirmations: flag(v.additionalConfirmations, d.additionalConfirmations),
    autoPass: flag(v.autoPass, d.autoPass),
    motion: oneOf(v.motion, ['system', 'reduced'] as const, d.motion),
    animationSpeed: speed,
    renderingQuality: oneOf(v.renderingQuality, ['automatic', 'flat', 'low', 'standard', 'enhanced'] as const, d.renderingQuality),
    deferNotificationsDuringPlay: flag(v.deferNotificationsDuringPlay, d.deferNotificationsDuringPlay),
    masterAudio: flag(v.masterAudio, d.masterAudio),
    music: flag(v.music, d.music),
    ambience: flag(v.ambience, d.ambience),
    gameplayCues: flag(v.gameplayCues, d.gameplayCues),
  });
}

/** Density for a surface: its own override, otherwise the global preference. */
export function densityFor(preferences: Preferences, surface?: DensitySurface): DensityPreference {
  return (surface && preferences.densityOverrides[surface]) || preferences.density;
}

export const DEVICE_PREFERENCES_KEY = 'the-inkspire.preferences.v1';
interface KeyValueStore { getItem(key: string): string | null; setItem(key: string, value: string): void }
/** Safe local fallback for non-sensitive settings. Never store hands, seeds, match state or replay contents here. */
export function readDevicePreferences(store: KeyValueStore | undefined): Preferences {
  try { const raw = store?.getItem(DEVICE_PREFERENCES_KEY); return raw ? parsePreferences(JSON.parse(raw)) : defaultPreferences; }
  catch { return defaultPreferences; }
}
export function writeDevicePreferences(store: KeyValueStore | undefined, preferences: Preferences): boolean {
  try { store?.setItem(DEVICE_PREFERENCES_KEY, JSON.stringify(parsePreferences(preferences))); return Boolean(store); }
  catch { return false; }
}
