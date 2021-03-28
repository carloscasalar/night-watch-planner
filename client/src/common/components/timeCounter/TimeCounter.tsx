import { FC } from 'react';
import { Icon } from '../icon/Icon';
import { IconName } from '../icon/iconAttributes';

export type Size = 'small' | 'medium' | 'big';

export interface TimeCounterProps {
  icon: IconName;
  size: Size;
  label: string;
  value: string;
  increase: () => void;
  decrease: () => void;
}

const styles = {
  small: {
    title: 'text-l px-1',
    icon: 'w-12 h-12',
    value: 'text-base',
    controlIcon: 'w-8 h-8',
  },
  medium: {
    title: 'text-xl px-2',
    icon: 'w-14 h-14',
    value: 'text-lg',
    controlIcon: 'w-8 h-8',
  },
  big: {
    title: 'text-xl px-3',
    icon: 'w-16 h-16',
    value: 'text-xl',
    controlIcon: 'w-8 h-8',
  },
};

export const TimeCounter: FC<TimeCounterProps> = ({
  icon,
  size = 'small',
  increase,
  decrease,
  label,
  value,
}) => {
  return (
    <div>
      <h2 className={`title-font font-medium ${styles[size].title}`}>
        {label}
      </h2>
      <div className="flex">
        <Icon name={icon} className={styles[size].icon} />
        <div className="flex flex-col">
          <span className={styles[size].value}>{value}</span>
          <div className="flex">
            <div className="p-1" onClick={increase}>
              <Icon
                name="add"
                className={`${styles[size].controlIcon} text-gray-500 rounded-full shadow-lg hover:shadow-2xl cursor-pointer`}
              />
            </div>
            <div className="p-1" onClick={decrease}>
              <Icon
                name="minus"
                className={`${styles[size].controlIcon} text-gray-300 rounded-full shadow-lg hover:shadow-2xl cursor-pointer`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
