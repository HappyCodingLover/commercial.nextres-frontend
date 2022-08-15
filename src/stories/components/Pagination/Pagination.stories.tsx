import type { ComponentMeta,ComponentStory } from '@storybook/react'

import { Pagination } from './Pagination'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Pagination',
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Pagination>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />

export const PrimaryPagination = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PrimaryPagination.args = {
  totalCount: 55,
  itemCountPerPage: 3,
  pageNum: 0,
}
