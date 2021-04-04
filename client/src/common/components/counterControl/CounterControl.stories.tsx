import { Story, Meta } from '@storybook/react';

import { CounterControl, CounterControlProps } from './CounterControl';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Common/CounterControl',
  component: CounterControl,
  // argTypes: {
  //   icon: { control: {type:} },
  //   size: { control: {type: }}
  // },
} as Meta;

export const CounterControlStory: Story<CounterControlProps> = ({
  icon,
  size,
  label,
  value,
}) => (
  <CounterControl
    icon={icon}
    size={size}
    label={label}
    value={value}
    increase={action('increase pushed')}
    decrease={action('decrease pushed')}
  />
);

CounterControlStory.args = {
  label: 'The label',
  value: '1h, 30min',
  size: 'big',
  icon: 'sand-clock',
};
