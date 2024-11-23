import React, { MouseEventHandler } from 'react';
import cn from 'classnames';
import { CheckIcon } from '@heroicons/react/20/solid';
type Props = {
  label: string;
  isActive?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

function SelectItem({ label, isActive, className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer items-center space-x-2 bg-theme-white p-4 pr-3 hover:bg-primary/5',
        className
      )}>
      <div className='grow'>{label}</div>
      <CheckIcon
        className={cn(
          'h-5 w-5 shrink-0 text-primary',
          isActive ? 'visible' : 'invisible'
        )}
        aria-hidden='true'
      />
      {/* visible */}
    </div>
  );
}

export default SelectItem;
