import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Select } from './Select'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Select',
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Select>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'select',
  title: 'Text',
  name: 'text',
  value: 'Item 2',
  options: ['Item 1', 'Item 2', 'Item 3'],
}
