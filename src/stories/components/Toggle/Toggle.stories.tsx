import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Toggle } from './Toggle'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Toggle',
  component: Toggle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Toggle>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'select',
  title: 'Text',
  name: 'text',
}
