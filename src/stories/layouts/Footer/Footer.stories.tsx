import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Footer } from './Footer'

export default {
  title: 'Layouts/Footer',
  component: Footer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = () => <Footer />

export const DefaultFooter = Template.bind({})
DefaultFooter.args = {
  navigation: [
    { name: 'Private Policy', href: '#' },
    { name: 'Fair Lending Policy', href: '#' },
    { name: 'Reporting Mortgage Fraud', href: '#' },
  ],
}
