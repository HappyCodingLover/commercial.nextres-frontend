import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { ToggleButton } from './ToggleButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ToggleButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToggleButton> = (args) => <ToggleButton {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 'sm',
  label: ['Yes', 'No'],
}
