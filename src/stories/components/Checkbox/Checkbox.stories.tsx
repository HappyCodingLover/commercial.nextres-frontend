import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { Checkbox } from './Checkbox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Checkbox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'check',
  title: 'Check box',
  name: 'check',
}
