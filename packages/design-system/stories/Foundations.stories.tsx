import type { Meta, StoryObj } from '@storybook/react-vite';
import { FanContentNotice, Heading, Icon, Inline, Stack, Surface, Text, Wordmark, iconNames } from '../src/index.ts';
import { iconDoc } from '../src/components/Icon/Icon.docs.ts';
import { headingDoc, textDoc } from '../src/components/Text/Text.docs.ts';
import { inlineDoc, stackDoc, surfaceDoc } from '../src/components/Layout/Layout.docs.ts';
import { wordmarkDoc } from '../src/components/Wordmark/Wordmark.docs.ts';
import { fanContentNoticeDoc } from '../src/components/FanContentNotice/FanContentNotice.docs.ts';
import { DocPage } from './support/DocPage.tsx';
import { longText } from './support/fixtures.ts';

const meta = { title: 'Foundations/Type, layout and identity' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = { render: () => <DocPage docs={[textDoc, headingDoc, stackDoc, inlineDoc, surfaceDoc, iconDoc, wordmarkDoc, fanContentNoticeDoc]} /> };
export const TypeRoles: Story = {
  parameters: { designSystem: { coverage: { Text: ['default', 'supporting', 'numeric'], Heading: ['default'] } } },
  render: () => <Stack gap={6}>
    <Heading level={1} role="display">Display moment</Heading>
    <Heading level={2} role="room">Room title</Heading>
    <Heading level={3} role="section">Section heading</Heading>
    <Heading level={4} role="subsection">Subsection heading</Heading>
    <Text role="critical">Critical match information</Text>
    <Text>Body text for ordinary reading and standard controls.</Text>
    <Text role="metadata" tone="supporting">Metadata · Set and printing details</Text>
    <Text role="annotation" tone="supporting">Small annotation for nonessential details</Text>
    <Text numeric>Lore 12 · Ink 7 · Cards 60</Text>
  </Stack>,
};
export const LongContent: Story = {
  parameters: { designSystem: { coverage: { Text: ['long content'], Heading: ['long content'] } } },
  render: () => <Stack gap={4}><Heading level={2} role="section">A heading long enough to wrap across more than one line in narrow layouts</Heading><Text>{longText} {longText}</Text></Stack>,
};
export const Layout: Story = {
  parameters: { designSystem: { coverage: { Stack: ['default', 'nested groups'], Inline: ['default', 'wrapping'], Surface: ['default', 'bordered', 'raised'] } } },
  render: () => <Stack gap={6}>
    <Surface><Text>Default surface</Text></Surface>
    <Surface bordered><Stack gap={2}><Text role="body-strong">Bordered surface</Text><Text tone="supporting">With a nested group.</Text></Stack></Surface>
    <Surface level="raised"><Inline gap={2}>{Array.from({ length: 12 }, (_, i) => <Surface key={i} bordered padded><Text as="span">Item {i + 1}</Text></Surface>)}</Inline></Surface>
  </Stack>,
};
export const Icons: Story = {
  parameters: { designSystem: { coverage: { Icon: ['decorative', 'labelled'] } } },
  render: () => <Stack gap={4}>
    <Inline gap={4}>{iconNames.map(name => <span key={name} style={{ display: 'inline-flex', gap: 'var(--is-space-1)', alignItems: 'center' }}><Icon name={name} /><Text as="span" role="metadata">{name}</Text></span>)}</Inline>
    <Inline gap={4}><Icon name="warning" label="Warning" /><Icon name="success" label="Success" size="small" /></Inline>
  </Stack>,
};
export const Identity: Story = {
  parameters: { designSystem: { coverage: { Wordmark: ['default'], FanContentNotice: ['default'] } } },
  render: () => <Stack gap={6}><Wordmark as="p" /><FanContentNotice /></Stack>,
};
