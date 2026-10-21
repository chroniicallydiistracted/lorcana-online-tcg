import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Confirmation, Dialog, DialogTrigger, IconButton, Inline, Menu, MenuItem, MenuTrigger, Popover, PopoverTrigger, Stack, Tab, TabList, TabPanel, Tabs, Text } from '../src/index.ts';
import { tabsDoc } from '../src/components/Tabs/Tabs.docs.ts';
import { menuDoc } from '../src/components/Menu/Menu.docs.ts';
import { popoverDoc } from '../src/components/Popover/Popover.docs.ts';
import { dialogDoc, sheetDoc } from '../src/components/Dialog/Dialog.docs.ts';
import { confirmationDoc } from '../src/components/Confirmation/Confirmation.docs.ts';
import { DocPage } from './support/DocPage.tsx';
import { longText } from './support/fixtures.ts';

const meta = { title: 'Overlays/Tabs, menus and dialogs' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = { render: () => <DocPage docs={[tabsDoc, menuDoc, popoverDoc, dialogDoc, sheetDoc, confirmationDoc]} /> };
export const TabsStory: Story = {
  name: 'Tabs',
  parameters: { designSystem: { coverage: { Tabs: ['selected', 'hovered', 'focused', 'disabled tab', 'many tabs wrapping'] } } },
  render: () => <Tabs disabledKeys={['trades']}>
    <TabList aria-label="Collection sections">{['Binder', 'Grid', 'List', 'Favorites', 'Recently opened', 'Wishlist', 'Trades'].map(label => <Tab key={label} id={label.toLowerCase()}>{label}</Tab>)}</TabList>
    {['binder', 'grid', 'list', 'favorites', 'recently opened', 'wishlist', 'trades'].map(id => <TabPanel key={id} id={id}><Text>{id} panel</Text></TabPanel>)}
  </Tabs>,
};
export const Menus: Story = {
  parameters: { designSystem: { coverage: { Menu: ['closed', 'focused item', 'disabled item', 'long item'] } } },
  render: () => <Inline gap={6}>
    <MenuTrigger><IconButton icon="more" label="Deck actions" variant="secondary" /><Menu disabledKeys={['publish']}>
      <MenuItem id="duplicate" icon="plus">Duplicate deck</MenuItem>
      <MenuItem id="export" description="Copy as text in the selected export format">Export deck</MenuItem>
      <MenuItem id="publish">Publish (requires a valid deck)</MenuItem>
      <MenuItem id="long">A menu item label that is long enough to wrap onto a second line</MenuItem>
      <MenuItem id="delete" tone="danger">Delete deck</MenuItem>
    </Menu></MenuTrigger>
  </Inline>,
};
export const MenuOpen: Story = {
  parameters: { designSystem: { coverage: { Menu: ['open'] } } },
  render: () => <div style={{ minBlockSize: '14rem' }}><MenuTrigger defaultOpen><Button>Open menu</Button><Menu><MenuItem id="a">First action</MenuItem><MenuItem id="b">Second action</MenuItem></Menu></MenuTrigger></div>,
};
export const Popovers: Story = {
  parameters: { designSystem: { coverage: { Popover: ['closed', 'open', 'long content'] } } },
  render: () => <Inline gap={6}>
    <PopoverTrigger><Button>What is Shift?</Button><Popover title="Shift">Play this character on top of one with the same name by paying the Shift cost.</Popover></PopoverTrigger>
    <PopoverTrigger defaultOpen><Button>Long explanation</Button><Popover title="Long content" placement="end">{longText}</Popover></PopoverTrigger>
  </Inline>,
};
export const Dialogs: Story = {
  parameters: { designSystem: { coverage: { Dialog: ['open', 'non-dismissable', 'long content', 'sheet'], Sheet: ['open', 'compact bottom sheet'] } } },
  render: () => <Inline gap={3}>
    <DialogTrigger><Button>Open dialog</Button><Dialog title="Import deck" actions={<><Button>Cancel</Button><Button variant="primary">Import deck</Button></>}><Text>Paste a deck list. A preview appears before anything is saved.</Text></Dialog></DialogTrigger>
    <DialogTrigger><Button>Open non-dismissable</Button><Dialog title="Saving your deck" isDismissable={false} actions={<Button variant="primary">Done</Button>}><Text>The save is pending. This review cannot be dismissed by accident.</Text></Dialog></DialogTrigger>
    <DialogTrigger><Button>Open long dialog</Button><Dialog title="Event rules">{Array.from({ length: 12 }, (_, i) => <Text key={i}>{longText}</Text>)}</Dialog></DialogTrigger>
    <DialogTrigger><Button>Open sheet</Button><Dialog presentation="sheet" title="Filters"><Text>Secondary filters in a sheet.</Text></Dialog></DialogTrigger>
  </Inline>,
};
export const Confirmations: Story = {
  parameters: { designSystem: { coverage: { Confirmation: ['open', 'with context', 'danger', 'long content'] } } },
  render: () => {
    const [open, setOpen] = useState<null | 'end' | 'quest' | 'delete'>(null);
    return <Stack gap={3} align="start">
      <Inline gap={3}>
        <Button onPress={() => setOpen('end')}>End turn</Button>
        <Button onPress={() => setOpen('quest')}>Quest with all characters</Button>
        <Button variant="danger" onPress={() => setOpen('delete')}>Delete deck</Button>
      </Inline>
      <Confirmation isOpen={open === 'end'} onOpenChange={v => setOpen(v ? 'end' : null)} title="End your turn?" consequence="Your turn ends and your opponent becomes the active player." context={<Text>You still have 2 ink available and 1 ready character that can quest. Taking these is optional.</Text>} confirmLabel="End turn" cancelLabel="Keep playing" onConfirm={() => {}} />
      <Confirmation isOpen={open === 'quest'} onOpenChange={v => setOpen(v ? 'quest' : null)} title="Quest with all characters?" consequence="These characters will quest. Unresolved effects may still change the final lore gained." context={<ul style={{ margin: 0 }}><li>Elsa – Spirit of Winter</li><li>Stitch – Rock Star</li></ul>} confirmLabel="Quest with all characters" cancelLabel="Keep playing" onConfirm={() => {}} />
      <Confirmation isOpen={open === 'delete'} onOpenChange={v => setOpen(v ? 'delete' : null)} tone="danger" title="Delete this deck?" consequence={`The deck and its notes are removed from your account. ${longText}`} confirmLabel="Delete deck" cancelLabel="Keep deck" onConfirm={() => {}} />
    </Stack>;
  },
};
