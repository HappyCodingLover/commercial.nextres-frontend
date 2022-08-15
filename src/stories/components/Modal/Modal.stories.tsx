import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Modal } from './Modal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Modal',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Modal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  button: (
    <button className="text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
      Click ME
    </button>
  ),
  title: 'Sample title',
  titleOkay: 'Okay',
  titleCancel: 'Cancel',
  children: 'Content',
}
