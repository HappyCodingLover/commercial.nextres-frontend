import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { TextArea } from './TextArea'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TextArea',
  component: TextArea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TextArea>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'blue',
  title: 'Text',
  name: 'text',
  value: 'default text content',
  autoFocus: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  color: 'blue',
  title: 'Disabled Text',
  name: 'text',
  value: 'Here is the disabled textarea content',
  disabled: true,
}
