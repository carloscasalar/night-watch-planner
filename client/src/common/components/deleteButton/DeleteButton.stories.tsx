import { Meta, Story } from '@storybook/react';
import { DeleteButton, DeleteButtonProps } from './DeleteButton';

const stories: Meta = {
  title: 'Common/Buttons/DeleteButton',
  component: DeleteButton,
};

export default stories;

export const DeleteButtonStory: Story<DeleteButtonProps> = ({
  className,
  onClick,
}) => <DeleteButton className={className} onClick={onClick} />;

DeleteButtonStory.args = {
  className: 'cursor-pointer',
};

DeleteButtonStory.argTypes = {
  onClick: { action: 'button clicked' },
};
