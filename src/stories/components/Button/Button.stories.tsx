import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Button } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Button',
}

export const Default = Template.bind({})
Default.args = {
  size: 'lg',
  children: 'Default Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Button',
}

export const Pills = Template.bind({})
Pills.args = {
  size: 'lg',
  pills: true,
  children: 'Button',
}

export const Outline = Template.bind({})
Outline.args = {
  size: 'lg',
  outline: true,
  children: 'Button',
}

export const Disabled = Template.bind({})
Disabled.args = {
  size: 'lg',
  disabled: true,
  children: 'Disabled Button',
}

export const Bold = Template.bind({})
Bold.args = {
  size: 'lg',
  bold: true,
  children: 'Bold Button',
}
