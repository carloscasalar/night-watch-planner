import { type StoryObj, type Meta } from '@storybook/react'
import { EditableText } from './EditableText'

const meta = {
  title: 'Common/EditableText',
  component: EditableText,
  argTypes: {
    onChange: { action: 'on value changed' }
  }
} satisfies Meta<typeof EditableText>
export default meta

type Story = StoryObj<typeof EditableText>

export const EditableTextStory: Story = {
  render: ({ as, className, value, onChange }) => (<EditableText as={as} className={className} value={value} onChange={onChange} />),
  args: {
    as: 'span',
    className: 'text-gray-900 title-font font-medium text-xl cursor-text',
    value: 'This is an editable text'
  }
}
