import { ElementType, FC } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

export interface EditableTextProps {
  as: ElementType;
  className: string;
  value: string;
  onChange: (value: string) => void;
}

const domParser = new DOMParser();

export const EditableText: FC<EditableTextProps> = ({
  as = 'span',
  className,
  value,
  onChange,
}) => {
  const handleValueChange = ({ target: { value } }: ContentEditableEvent) => {
    const doc = domParser.parseFromString(value, 'text/html');
    const plainTextValue = doc.body.textContent || '';

    onChange(plainTextValue);
  };
  return (
    <ContentEditable
      html={value}
      tagName={as as string}
      className={className}
      onChange={handleValueChange}
    />
  );
};
