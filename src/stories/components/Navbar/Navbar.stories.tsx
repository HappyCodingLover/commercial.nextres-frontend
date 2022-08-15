import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Navbar } from './Navbar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Navbar',
  component: Navbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Navbar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />

export const PrimaryNavbar = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryNavbar.args = {
  title: 'Nextres',
  activeNav: 'Home',
  navigations: ['Home', 'About', 'Services', 'Pricing', 'Contact'],
  color: 'blue',
}
