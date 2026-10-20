import type { ComponentDoc } from '../../src/index.ts';
import { Badge, Heading, Stack, Text } from '../../src/index.ts';

const rows: [keyof ComponentDoc, string][] = [['anatomy', 'Anatomy'], ['variants', 'Variants'], ['states', 'States'], ['inputs', 'Inputs'], ['outputs', 'Outputs'], ['accessibility', 'Accessibility'], ['contentLimits', 'Content limits'], ['usage', 'Usage constraints']];
/** Renders a component's documentation contract (standard §13) as a Storybook page. */
export function DocPage({ docs }: { docs: readonly ComponentDoc[] }) {
  return <Stack gap={12}>{docs.map(doc => <Stack key={doc.name} gap={4} as="section">
    <Heading level={1} role="room">{doc.name}</Heading>
    <div><Badge tone={doc.status === 'stable' ? 'success' : 'neutral'}>{doc.status}</Badge></div>
    <Text>{doc.purpose}</Text>
    <Text role="metadata" tone="supporting">Foundation: {doc.foundation}</Text>
    {rows.map(([key, label]) => {
      const items = doc[key] as readonly string[];
      return <Stack key={key} gap={2} as="section"><Heading level={2} role="subsection">{label}</Heading>
        {items.length ? <ul style={{ margin: 0, paddingInlineStart: 'var(--is-space-6)' }}>{items.map(item => <li key={item}><Text as="span">{item}</Text></li>)}</ul> : <Text tone="supporting">None.</Text>}
      </Stack>;
    })}
  </Stack>)}</Stack>;
}
