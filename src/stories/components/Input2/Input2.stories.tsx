import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Input2 } from './Input2'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Input2',
  component: Input2,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Input2>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input2> = (args) => <Input2 {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'blue',
  title: 'Text',
  name: 'text',
  type: 'text',
  value: 'default text content',
  autoFocus: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  color: 'blue',
  title: 'Disabled Text',
  name: 'text',
  type: 'text',
  disabled: true,
}

export const InputEmail = Template.bind({})
InputEmail.args = {
  color: 'blue',
  title: 'Email',
  name: 'email',
  type: 'email',
  value: 'bigluckypal@gmail.com',
}

export const InputPassword = Template.bind({})
InputPassword.args = {
  color: 'blue',
  title: 'Password',
  name: 'password',
  type: 'password',
}

export const InputDate = Template.bind({})
InputDate.args = {
  color: 'blue',
  title: 'Date',
  name: 'date',
  type: 'date',
}

export const InputTime = Template.bind({})
InputTime.args = {
  color: 'blue',
  title: 'Time',
  name: 'time',
  type: 'time',
}

export const InputNumber = Template.bind({})
InputNumber.args = {
  color: 'blue',
  title: 'Number',
  name: 'number',
  type: 'number',
}
