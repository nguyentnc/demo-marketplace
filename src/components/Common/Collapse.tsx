import { useDebounceValue } from '@/hooks/internals';
import cn from 'classnames';
import React, { forwardRef } from 'react';
type Props = {
  children: React.ReactNode;
  panel: React.ReactNode;
  className?: string;
  panelClassName?: string;
  isShow: boolean;
  isDestroy?: boolean;
};

export const Collapse = forwardRef<HTMLDivElement, Props>(
  ({ children, panel, className, panelClassName, isShow, isDestroy }, ref) => {
    // const delayShow = useDeferredValue(isShow);
    const { debouncedValue: delayShow } = useDebounceValue(isShow, 300);
    return (
      <div className={cn('', className)} ref={ref}>
        {children}
        <div
          className={cn(
            'max-h-0 transition-all duration-300 ease-in-out',
            panelClassName,
            {
              'max-h-[999px] ': isShow,
              'overflow-hidden': !isShow,
            }
          )}>
          {(isShow || delayShow || !isDestroy) && panel}
        </div>
      </div>
    );
  }
);
Collapse.displayName = 'Collapse';
export default Collapse;
