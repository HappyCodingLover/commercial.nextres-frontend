import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { ConfirmModal } from './ConfirmModal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ConfirmModal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ConfirmModal> = (args) => <ConfirmModal {...args} />

export const Default = Template.bind({})
Default.args = {
  content: 'Are you sure you want to delete this product?',
}
