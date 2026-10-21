import styles from './CardFaceText.module.css';

export type RulesDensity = 'standard' | 'dense' | 'denser' | 'densest';
export interface CardFaceTextProps {
  title: string;
  version?: string;
  classification?: string;
  rules: readonly { readonly kind: 'ability' | 'keyword' | 'rules'; readonly heading?: string; readonly text: string }[];
  flavor?: string;
  density?: RulesDensity;
}
/**
 * Preserved card-face typography (§7) at printed proportions inside a card-face container.
 * This text layer is not a readable inspection presentation; CardInspector provides that.
 */
export function CardFaceText({ title, version, classification, rules, flavor, density = 'standard' }: CardFaceTextProps) {
  return <div className={styles.face} data-density={density}><div className={styles.content}>
    <p className={styles.title}>{title}</p>
    {version && <p className={styles.version}>{version}</p>}
    {classification && <p className={styles.classification}>{classification}</p>}
    <div className={styles.rules}>{rules.map((r, i) => <p key={i} className={styles.block} data-kind={r.kind}>{r.heading && <span className={styles.heading}>{r.heading} </span>}{r.text}</p>)}</div>
    {flavor && <p className={styles.flavor}>{flavor}</p>}
  </div></div>;
}
