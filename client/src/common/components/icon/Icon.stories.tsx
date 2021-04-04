import { Meta, Story } from '@storybook/react';
import { iconAttributes, IconName } from './iconAttributes';
import { Icon } from './Icon';

export default {
  title: 'Common/Icon',
} as Meta;

interface IconStoriesProps {
  foregroundColor: string;
  textColor: string;
}

export const Icons: Story<IconStoriesProps> = ({
  foregroundColor,
  textColor,
}) => (
  <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
    {Object.keys(iconAttributes).map((iconName) => (
      <div
        className="flex flex-col rounded shadow-md"
        style={{ color: `${textColor}` }}
      >
        <Icon
          name={iconName as IconName}
          className="h-12 w-12 self-center"
          foregroundColor={foregroundColor}
        />
        <span className="self-center">{iconName}</span>
      </div>
    ))}
  </div>
);

Icons.args = {
  foregroundColor: 'white',
  textColor: 'black',
};
