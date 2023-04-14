import { Meta, Story } from '@storybook/react';
import { EditableText, EditableTextProps } from './EditableText';

const stories: Meta = {
  title: 'Common/EditableText',
  component: EditableText,
};

export default stories;

export const EditableTextStory: Story<EditableTextProps> = ({
  as,
  className,
  value,
  onChange,
}) => (
  <EditableText
    as={as}
    className={className}
    value={value}
    onChange={onChange}
  />
);

EditableTextStory.args = {
  as: 'span',
  className: 'text-gray-900 title-font font-medium text-xl cursor-text',
  value: 'This is an editable text',
};

EditableTextStory.argTypes = {
  onChange: { action: 'on value changed' },
};
