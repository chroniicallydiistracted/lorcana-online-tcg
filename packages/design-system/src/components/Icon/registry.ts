// Curated interface icon registry (decision D21): Phosphor Regular, one consistent meaning per symbol.
// This is the only module that may import Phosphor, and it imports each approved icon individually.
// Printed gameplay symbols (inks, lore, strength, willpower, inkability) are not interface icons:
// they come from the verified Lorcana assets in GameSymbol and InkIdentity.
import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';
import { Bell } from '@phosphor-icons/react/dist/ssr/Bell';
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretLeft } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { CaretUp } from '@phosphor-icons/react/dist/ssr/CaretUp';
import { Check } from '@phosphor-icons/react/dist/ssr/Check';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock';
import { DotsThree } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { MagnifyingGlassPlus } from '@phosphor-icons/react/dist/ssr/MagnifyingGlassPlus';
import { Minus } from '@phosphor-icons/react/dist/ssr/Minus';
import { Plus } from '@phosphor-icons/react/dist/ssr/Plus';
import { Warning } from '@phosphor-icons/react/dist/ssr/Warning';
import { WarningOctagon } from '@phosphor-icons/react/dist/ssr/WarningOctagon';
import { WifiHigh } from '@phosphor-icons/react/dist/ssr/WifiHigh';
import { WifiSlash } from '@phosphor-icons/react/dist/ssr/WifiSlash';
import { X } from '@phosphor-icons/react/dist/ssr/X';

/** Semantic name → approved Phosphor icon. Add a meaning here before using a new symbol. */
export const iconRegistry = {
  close: { icon: X, meaning: 'Close or dismiss a surface; clear a field.' },
  search: { icon: MagnifyingGlass, meaning: 'Search.' },
  'chevron-down': { icon: CaretDown, meaning: 'Open a list or disclosure below.' },
  'chevron-up': { icon: CaretUp, meaning: 'Collapse a disclosure; move up.' },
  'chevron-left': { icon: CaretLeft, meaning: 'Previous item or page.' },
  'chevron-right': { icon: CaretRight, meaning: 'Next item or page.' },
  check: { icon: Check, meaning: 'Selected or confirmed choice.' },
  plus: { icon: Plus, meaning: 'Add or increase.' },
  minus: { icon: Minus, meaning: 'Remove or decrease; indeterminate selection.' },
  info: { icon: Info, meaning: 'Neutral information.' },
  success: { icon: CheckCircle, meaning: 'Completed successfully.' },
  warning: { icon: Warning, meaning: 'Needs attention; not yet a failure.' },
  danger: { icon: WarningOctagon, meaning: 'Failed, invalid or destructive.' },
  pending: { icon: Clock, meaning: 'Waiting or in progress.' },
  connection: { icon: WifiHigh, meaning: 'Connected.' },
  offline: { icon: WifiSlash, meaning: 'Disconnected or offline.' },
  refresh: { icon: ArrowClockwise, meaning: 'Retry or refresh.' },
  more: { icon: DotsThree, meaning: 'More actions.' },
  external: { icon: ArrowSquareOut, meaning: 'Opens outside the current surface.' },
  bell: { icon: Bell, meaning: 'Notifications.' },
  inspect: { icon: MagnifyingGlassPlus, meaning: 'Inspect or zoom into detail.' },
} as const;
