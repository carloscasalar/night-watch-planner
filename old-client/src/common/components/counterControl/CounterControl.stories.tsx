import { Story, Meta } from '@storybook/react';

import { CounterControl, CounterControlProps } from './CounterControl';

export default {
  title: 'Common/CounterControl',
  component: CounterControl,
} as Meta;

export const CounterControlStory: Story<CounterControlProps> = ({
  icon,
  size,
  label,
  value,
  increase,
  decrease,
}) => (
  <CounterControl
    icon={icon}
    size={size}
    label={label}
    value={value}
    increase={increase}
    decrease={decrease}
  />
);

CounterControlStory.args = {
  label: 'The label',
  value: '1h, 30min',
  size: 'big',
  icon: 'sand-clock',
};

CounterControlStory.argTypes = {
  increase: { action: 'increase pushed' },
  decrease: { action: 'decrease pushed' },
};
