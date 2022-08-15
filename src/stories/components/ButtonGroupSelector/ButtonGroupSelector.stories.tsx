import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonGroupSelector } from './ButtonGroupSelector'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ButtonGroupSelector',
  component: ButtonGroupSelector,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ButtonGroupSelector>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonGroupSelector> = (args) => <ButtonGroupSelector {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Text',
  name: 'text',
  value: 'Item 2',
  options: ['Item 1', 'Item 2', 'Item 3'],
}
