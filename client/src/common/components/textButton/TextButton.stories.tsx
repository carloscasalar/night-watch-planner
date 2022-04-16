import { Meta, Story } from '@storybook/react';
import { TextButton, TextButtonProps } from './TextButton';

const stories: Meta = {
  title: 'Common/Buttons/TextButton',
  component: TextButton,
};

export default stories;

export const TextButtonStory: Story<TextButtonProps> = ({
  className,
  loading,
  onClick,
  children,
}) => (
  <TextButton className={className} loading={loading} onClick={onClick}>
    {children}
  </TextButton>
);

TextButtonStory.args = {
  className:
    'bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900 text-white uppercase',
  children: 'Some Text',
  loading: false,
};

TextButtonStory.argTypes = {
  onClick: { action: 'button clicked' },
};
