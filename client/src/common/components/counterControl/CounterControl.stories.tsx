import { type StoryObj, type Meta } from '@storybook/react'

import { CounterControl } from './CounterControl'

const meta = {
  title: 'Common/CounterControl',
  component: CounterControl,
  argTypes: {
    increase: { action: 'increase pushed' },
    decrease: { action: 'decrease pushed' }
  }
} satisfies Meta<typeof CounterControl>

export default meta

type Story = StoryObj<typeof CounterControl>
export const CounterControlStory: Story = {
  render: ({
    icon,
    size,
    label,
    value,
    increase,
    decrease
  }) => (<CounterControl
    icon={icon}
    size={size}
    label={label}
    value={value}
    increase={increase}
    decrease={decrease}
  />),
  args: {
    label: 'The label',
    value: '1h, 30min',
    size: 'big',
    icon: 'sand-clock'
  }
}
