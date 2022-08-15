import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { AutoComplete } from './AutoComplete'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AutoComplete>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'blue',
  title: 'Text',
  name: 'text',
  type: 'text',
  value: ['abc', 'bcd', 'cde'],
  placeholder: 'Add a new text.',
  autoFocus: true,
}

// export const InputEmail = Template.bind({})
// InputEmail.args = {
//   color: 'blue',
//   title: 'Email',
//   name: 'email',
//   type: 'email',
//   value: ['test@gmail.com', 'test123@gmail.com'],
//   placeholder: 'Add a new email.',
// }

// export const InputNumber = Template.bind({})
// InputNumber.args = {
//   color: 'blue',
//   title: 'Number',
//   name: 'number',
//   type: 'number',
//   value: [1001, 1002],
//   placeholder: 'Add a new number.',
// }
