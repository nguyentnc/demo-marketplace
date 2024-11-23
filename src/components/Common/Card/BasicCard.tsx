import React from 'react';
import cn from 'classnames';
type Props = {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isShadow?: boolean;
  action?: React.ReactNode;
};

export const BasicCard = ({
  title,
  children,
  icon,
  className,
  isShadow = false,
  action,
}: Props) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-theme-white',
        {
          'shadow-card': isShadow,
        },
        className
      )}>
      {title ? (
        <div className='flex justify-between border-b p-4'>
          <div className='flex space-x-2'>
            {icon && <div className='flex flex-col justify-center'>{icon}</div>}
            <p className='text-lg font-bold'>{title}</p>
          </div>
          {action}
        </div>
      ) : null}

      {children}
    </div>
  );
};

export default BasicCard;
