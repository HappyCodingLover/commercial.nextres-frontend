import { UserAddIcon } from '@heroicons/react/outline'
import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { IconButton } from './IconButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/IconButton',
  component: IconButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof IconButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: UserAddIcon,
}
