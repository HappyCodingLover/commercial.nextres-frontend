import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { Header } from './Header'

export default {
  title: 'Layouts/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const DefaultHeader = Template.bind({})
DefaultHeader.args = {}
