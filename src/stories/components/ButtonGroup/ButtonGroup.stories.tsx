import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonGroup } from './ButtonGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ButtonGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonGroup> = (args) => <ButtonGroup {...args} />

export const Default = Template.bind({})
Default.args = {
  title: ['All', 'PTD'],
  value: 'All',
  onChange: () => {},
}
