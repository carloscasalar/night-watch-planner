import { FC } from 'react';
import { Icon } from '../icon/Icon';
import { IconName } from '../icon/iconAttributes';

export type Size = 'small' | 'medium' | 'big';

export interface CounterControlProps {
  icon: IconName;
  size: Size;
  label: string;
  value: string;
  increase: () => void;
  decrease: () => void;
}

const styles = {
  small: {
    title: 'font-bold text-sm px-1',
    icon: 'w-12 h-12',
    value: 'text-base px-1',
  },
  medium: {
    title: 'font-bold text-xl px-1',
    icon: 'w-14 h-14',
    value: 'text-lg',
  },
  big: {
    title: 'font-medium text-xl px-3',
    icon: 'w-16 h-16',
    value: 'text-xl',
  },
};

export const CounterControl: FC<CounterControlProps> = ({
  icon,
  size = 'small',
  increase,
  decrease,
  label,
  value,
}) => {
  return (
    <div>
      <h2 className={`title-font ${styles[size].title}`}>{label}</h2>
      <div className="flex">
        <Icon name={icon} className={styles[size].icon} />
        <div className="flex flex-col">
          <span className={styles[size].value}>{value}</span>
          <div className="flex">
            <button className="p-1" onClick={increase}>
              <Icon
                name="add"
                className="w-6 h-6 text-gray-500 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
              />
            </button>
            <button className="p-1" onClick={decrease}>
              <Icon
                name="minus"
                className="w-6 h-6 text-gray-300 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
