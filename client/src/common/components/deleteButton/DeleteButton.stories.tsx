import { type StoryObj, type Meta } from '@storybook/react'
import { DeleteButton } from './DeleteButton'

const meta = {
  title: 'Common/Buttons/DeleteButton',
  component: DeleteButton,
  argTypes: {
    onClick: { action: 'button clicked' }
  }
} satisfies Meta<typeof DeleteButton>

export default meta

type Story = StoryObj<typeof DeleteButton>
export const DeleteButtonStory: Story = {
  render: ({ className, onClick }) => (<DeleteButton className={className} onClick={onClick} />),
  args: {
    className: 'cursor-pointer'
  }
}
