import cn from 'classnames';
import { ReactNode } from 'react';

import LoadingRing from './LoadingRing';

type Props = {
  children: ReactNode;
  show: boolean;
  className?: string;
  backdropClassName?: string;
  loadingClassName?: string;
};
const BackdropLoading = ({
  children,
  show = false,
  className,
  backdropClassName,
  loadingClassName,
}: Props) => {
  return (
    <div className={cn('relative z-10', className)}>
      <div
        className={cn(
          'absolute inset-0 z-[9999] bg-theme-black/10',
          backdropClassName,
          !show && 'hidden'
        )}>
        <LoadingRing
          size='md'
          className={cn('absolute left-1/2 top-1/2', loadingClassName)}
        />
      </div>
      {children}
    </div>
  );
};

export default BackdropLoading;
