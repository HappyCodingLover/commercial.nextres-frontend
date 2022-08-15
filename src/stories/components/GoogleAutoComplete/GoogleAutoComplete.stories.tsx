import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { GoogleAutoComplete } from './GoogleAutoComplete'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/GoogleAutoComplete',
  component: GoogleAutoComplete,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof GoogleAutoComplete>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GoogleAutoComplete> = (args) => <GoogleAutoComplete {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'address',
  value: 'New York',
}
