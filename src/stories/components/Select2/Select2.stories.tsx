import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Select2 } from './Select2'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Select2',
  component: Select2,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Select2>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select2> = (args) => <Select2 {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'select2',
  title: 'Text',
  name: 'text',
  value: 'Item 2',
  options: ['Item 1', 'Item 2', 'Item 3'],
}
