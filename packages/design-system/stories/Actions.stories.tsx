import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, IconButton, Inline, Link, Stack, Text, Tooltip, TooltipTrigger } from '../src/index.ts';
import { buttonDoc, iconButtonDoc } from '../src/components/Button/Button.docs.ts';
import { linkDoc } from '../src/components/Link/Link.docs.ts';
import { tooltipDoc } from '../src/components/Tooltip/Tooltip.docs.ts';
import { DocPage } from './support/DocPage.tsx';

const meta = { title: 'Actions/Button, link and tooltip' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = { render: () => <DocPage docs={[buttonDoc, iconButtonDoc, linkDoc, tooltipDoc]} /> };
export const Buttons: Story = {
  parameters: { designSystem: { coverage: { Button: ['default', 'hovered', 'pressed', 'focused'] } } },
  render: () => <Inline gap={3}>
    <Button variant="primary">End turn</Button>
    <Button>Keep playing</Button>
    <Button variant="quiet" icon="refresh">Retry connection</Button>
    <Button variant="danger">Remove printing</Button>
  </Inline>,
};
export const States: Story = {
  parameters: { designSystem: { coverage: { Button: ['disabled', 'pending', 'long label'] } } },
  render: () => <Stack gap={4} align="start">
    <Inline gap={3}><Button variant="primary" isDisabled>Quest with all characters</Button><Button isDisabled>Add to deck</Button></Inline>
    <Text role="metadata" tone="supporting">Add to deck is unavailable: the deck already holds the format's maximum copies.</Text>
    <Inline gap={3}><Button variant="primary" isPending>Submit deck</Button><Button isPending>Save</Button></Inline>
    <div style={{ maxInlineSize: '16rem' }}><Button variant="primary">Quest with all characters that are ready and able to quest</Button></div>
  </Stack>,
};
export const IconButtons: Story = {
  parameters: { designSystem: { coverage: { IconButton: ['default', 'hovered', 'focused', 'disabled', 'pending'] } } },
  render: () => <Inline gap={2}>
    <IconButton icon="close" label="Close" />
    <IconButton icon="more" label="More actions" variant="secondary" />
    <IconButton icon="refresh" label="Retry connection" isDisabled />
    <IconButton icon="refresh" label="Retry connection" isPending />
  </Inline>,
};
export const Links: Story = {
  parameters: { designSystem: { coverage: { Link: ['default', 'hovered', 'focused', 'long destination'] } } },
  render: () => <Stack gap={3}>
    <Text>Read the <Link href="#rules">rules glossary</Link> for unfamiliar terms.</Text>
    <Text><Link href="https://example.org/a/very/long/destination/path/that/must/wrap/without/overflowing/the/layout" external>https://example.org/a/very/long/destination/path/that/must/wrap/without/overflowing/the/layout</Link></Text>
  </Stack>,
};
export const Tooltips: Story = {
  parameters: { designSystem: { coverage: { Tooltip: ['hidden', 'open on hover', 'open on focus'] } } },
  render: () => <Inline gap={6}>
    <TooltipTrigger><Button>Hover or focus</Button><Tooltip>Supplementary explanation</Tooltip></TooltipTrigger>
    <TooltipTrigger defaultOpen><Button>Open by default</Button><Tooltip placement="bottom">Shown on hover and keyboard focus</Tooltip></TooltipTrigger>
  </Inline>,
};
