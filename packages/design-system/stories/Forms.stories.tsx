import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox, ComboBox, Option, QuantityField, Radio, RadioGroup, SearchField, Select, Stack, Switch, TextArea, TextField } from '../src/index.ts';
import { textAreaDoc, textFieldDoc } from '../src/components/TextField/TextField.docs.ts';
import { searchFieldDoc } from '../src/components/SearchField/SearchField.docs.ts';
import { optionDoc, selectDoc } from '../src/components/Select/Select.docs.ts';
import { comboBoxDoc } from '../src/components/ComboBox/ComboBox.docs.ts';
import { checkboxDoc } from '../src/components/Checkbox/Checkbox.docs.ts';
import { radioDoc, radioGroupDoc } from '../src/components/Radio/Radio.docs.ts';
import { switchDoc } from '../src/components/Switch/Switch.docs.ts';
import { quantityFieldDoc } from '../src/components/QuantityField/QuantityField.docs.ts';
import { DocPage } from './support/DocPage.tsx';
import { longText } from './support/fixtures.ts';

const meta = { title: 'Forms/Fields and choices' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const sets = [{ id: 'syn1', name: 'Synthetic Set One' }, { id: 'syn2', name: 'Synthetic Set Two' }, { id: 'syn3', name: 'A Synthetic Set With A Long Name That Wraps Inside The List' }];

export const Documentation: Story = { render: () => <DocPage docs={[textFieldDoc, textAreaDoc, searchFieldDoc, selectDoc, optionDoc, comboBoxDoc, checkboxDoc, radioGroupDoc, radioDoc, switchDoc, quantityFieldDoc]} /> };
export const TextFields: Story = {
  parameters: { designSystem: { coverage: { TextField: ['default', 'focused', 'invalid', 'read-only', 'disabled', 'long content'], TextArea: ['default', 'focused', 'invalid', 'read-only', 'disabled', 'long content'] } } },
  render: () => <Stack gap={6}>
    <TextField label="Deck name" description="Shown to opponents when you share the deck." />
    <TextField label="Display name" isInvalid errorMessage="Display names need at least three characters." defaultValue="Al" />
    <TextField label="Account email" isReadOnly defaultValue="player@example.org" />
    <TextField label="Invite code" isDisabled description="Available after your account is verified." />
    <TextArea label="Deck notes" defaultValue={longText} />
    <TextArea label="Report details" isInvalid errorMessage="Describe what happened." />
    <TextArea label="Archived notes" isReadOnly defaultValue="Read-only notes." />
    <TextArea label="Locked notes" isDisabled />
  </Stack>,
};
export const Search: Story = {
  parameters: { designSystem: { coverage: { SearchField: ['empty', 'with query', 'no results', 'focused', 'disabled'] } } },
  render: () => {
    const [query, setQuery] = useState('explorer');
    return <Stack gap={6}>
      <SearchField label="Search cards" placeholder="Name, classification or text" />
      <SearchField label="Search collection" value={query} onChange={setQuery} resultCount={query ? 3 : 0} />
      <SearchField label="Search decks" defaultValue="zzzz" resultCount={0} description="No decks match. Reset filters or change the query." />
      <SearchField label="Search archive" isDisabled />
    </Stack>;
  },
};
export const Selects: Story = {
  parameters: { designSystem: { coverage: { Select: ['closed', 'selected', 'invalid', 'disabled'], Option: ['default', 'selected', 'disabled'] } } },
  render: () => <Stack gap={6}>
    <Select label="Set" items={sets} placeholder="Choose a set">{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</Select>
    <Select label="Format" defaultSelectedKey="syn2" items={sets}>{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</Select>
    <Select label="Queue" isInvalid errorMessage="Choose a queue to continue." items={sets} disabledKeys={['syn3']}>{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</Select>
    <Select label="Region" isDisabled items={sets}>{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</Select>
  </Stack>,
};
export const SelectOpen: Story = {
  parameters: { designSystem: { coverage: { Select: ['open', 'long option'], Option: ['focused'] } } },
  render: () => <div style={{ minBlockSize: '20rem' }}><Select label="Set" defaultOpen defaultSelectedKey="syn1" items={sets}>{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</Select></div>,
};
export const ComboBoxes: Story = {
  parameters: { designSystem: { coverage: { ComboBox: ['closed', 'open filtered', 'no matches', 'selected', 'invalid', 'disabled'] } } },
  render: () => <Stack gap={6}>
    <ComboBox label="Card" defaultItems={sets} placeholder="Type to filter">{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</ComboBox>
    <ComboBox label="Selected card" defaultItems={sets} defaultSelectedKey="syn1">{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</ComboBox>
    <ComboBox label="Required card" defaultItems={sets} isInvalid errorMessage="Choose a card from the list.">{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</ComboBox>
    <ComboBox label="Locked card" defaultItems={sets} isDisabled>{item => <Option id={item.id} textValue={item.name}>{item.name}</Option>}</ComboBox>
  </Stack>,
};
export const Choices: Story = {
  parameters: { designSystem: { coverage: { Checkbox: ['unchecked', 'checked', 'indeterminate', 'focused', 'invalid', 'disabled'], RadioGroup: ['none selected', 'selected', 'focused', 'invalid', 'disabled'], Radio: ['default', 'selected', 'disabled'], Switch: ['off', 'on', 'focused', 'disabled'] } } },
  render: () => <Stack gap={8}>
    <Stack gap={1}>
      <Checkbox>Show only owned printings</Checkbox>
      <Checkbox defaultSelected>Include foil printings</Checkbox>
      <Checkbox isIndeterminate>All sets</Checkbox>
      <Checkbox isInvalid>I have read the event rules</Checkbox>
      <Checkbox isDisabled>Sync favorites (unavailable while offline)</Checkbox>
    </Stack>
    <RadioGroup label="Collection view"><Radio value="binder">Binder</Radio><Radio value="grid">Grid</Radio><Radio value="list">List</Radio></RadioGroup>
    <RadioGroup label="Density" defaultValue="comfortable" orientation="horizontal"><Radio value="comfortable">Comfortable</Radio><Radio value="compact">Compact</Radio><Radio value="dense" isDisabled>Dense (not available)</Radio></RadioGroup>
    <RadioGroup label="Queue" isInvalid errorMessage="Choose a queue."><Radio value="casual">Casual</Radio><Radio value="ranked">Ranked</Radio></RadioGroup>
    <RadioGroup label="Region" isDisabled><Radio value="na">North America</Radio></RadioGroup>
    <Stack gap={1}>
      <Switch defaultSelected>Confirm before questing with all characters</Switch>
      <Switch defaultSelected>Confirm before ending turn</Switch>
      <Switch>Optional auto-pass</Switch>
      <Switch isDisabled>Music (sound is off)</Switch>
    </Stack>
  </Stack>,
};
export const Quantities: Story = {
  parameters: { designSystem: { coverage: { QuantityField: ['default', 'at minimum', 'at maximum', 'invalid', 'disabled'] } } },
  render: () => <Stack gap={6}>
    <QuantityField label="Copies" defaultValue={2} minValue={0} maxValue={4} />
    <QuantityField label="Copies at minimum" defaultValue={0} minValue={0} maxValue={4} />
    <QuantityField label="Copies at maximum" defaultValue={4} minValue={0} maxValue={4} description="The active format allows at most 4 copies." />
    <QuantityField label="Copies over your collection" defaultValue={3} minValue={0} maxValue={4} isInvalid errorMessage="You own 2 copies of this printing." />
    <QuantityField label="Locked copies" defaultValue={1} minValue={0} maxValue={4} isDisabled />
  </Stack>,
};
