import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { MultiSelect } from './MultiSelect'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MultiSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MultiSelect> = (args) => <MultiSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'select2',
  title: 'Text',
  name: 'text',
  value: { 'Item 2': true },
  options: ['Item 1', 'Item 2', 'Item 3'],
}
