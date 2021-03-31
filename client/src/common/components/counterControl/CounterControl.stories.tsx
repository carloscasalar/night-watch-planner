import { Story, Meta } from '@storybook/react';

import { CounterControl } from './CounterControl';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Common/CounterControl',
  component: CounterControl,
  decorators: [withKnobs],
} as Meta;

export const Big: Story = () => (
  <CounterControl
    icon="sand-clock"
    size="big"
    label={text('label', 'The label')}
    value={text('value', '1h, 30min')}
    increase={action('increase pushed')}
    decrease={action('decrease pushed')}
  />
);
