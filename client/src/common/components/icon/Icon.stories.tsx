import { type StoryObj, type Meta } from '@storybook/react'
import { iconAttributes, type IconName } from './iconAttributes'
import { Icon } from './Icon'
import { type FC } from 'react'

interface IconStoriesProps {
  foregroundColor: string
  textColor: string
}

const Template: FC<IconStoriesProps> = ({ foregroundColor, textColor }: IconStoriesProps) => (
  <div className="grid grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-8">
    {Object.keys(iconAttributes).map((iconName) => (
      <div
        className="flex flex-col rounded shadow-md"
        style={{ color: `${textColor}` }}
        key={iconName}
      >
        <Icon
          name={iconName as IconName}
          className="self-center w-12 h-12"
          foregroundColor={foregroundColor}
        />
        <span className="self-center">{iconName}</span>
      </div>
    ))}
  </div>
)
const meta = {
  title: 'Common/Icon',
  component: Template
} satisfies Meta<typeof Template>
export default meta

type Story = StoryObj<typeof Template>
export const Icons: Story = {
  render: ({ foregroundColor, textColor }) => (
    <Template
      foregroundColor={foregroundColor}
      textColor={textColor}
    />
  ),
  args: {
    foregroundColor: 'white',
    textColor: 'black'
  }
}
