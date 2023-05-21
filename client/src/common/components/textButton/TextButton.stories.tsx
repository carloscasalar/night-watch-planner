import { type StoryObj, type Meta } from '@storybook/react'
import { TextButton } from './TextButton'

const meta = {
  title: 'Common/Buttons/TextButton',
  component: TextButton,
  argTypes: {
    onClick: { action: 'button clicked' }
  }
} satisfies Meta<typeof TextButton>
export default meta

type Story = StoryObj<typeof TextButton>
export const TextButtonStory: Story = {
  render: ({
    className,
    loading,
    onClick,
    children
  }) => (
    <TextButton className={className} loading={loading} onClick={onClick}>
      {children}
    </TextButton>
  ),
  args: {
    className:
      'bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900 text-white uppercase',
    children: 'Some Text',
    loading: false
  }
}
