import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';
import Container from './Container';
type Props = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
  isMobileHideRight?: boolean;
  stickyClassName?: string;
};

export function StickyContentLayout({
  leftContent,
  rightContent,
  className,
  children,
  isMobileHideRight,
  stickyClassName,
}: PropsWithChildren<Props>) {
  return (
    <Container
      className={cn(
        'flex flex-col items-start gap-6 pb-10 md:flex-row md:items-stretch',
        className
      )}>
      <div
        className={cn('relative z-[1] w-full max-w-full flex-2 md:w-auto', {
          'md:max-w-[70%]': rightContent,
        })}>
        <div className={cn('sticky top-4', stickyClassName)}>
          {leftContent}
          {children}
        </div>
      </div>
      {rightContent && (
        <div
          className={cn('flex w-full md:w-auto   md:flex-1', {
            '!hidden md:!flex ': isMobileHideRight,
          })}>
          <div className='w-full'>
            <div className={cn('sticky top-4', stickyClassName)}>
              {rightContent}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default StickyContentLayout;
