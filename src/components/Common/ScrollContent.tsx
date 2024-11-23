import cn from 'classnames';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

type Props = {
  height: number;
  freezeOnceVisible?: boolean;
  handleEndOfContent?: () => void;
  className?: string;
};

export default function ScrollContent({
  height,
  freezeOnceVisible = true,
  children,
  className,
  handleEndOfContent,
}: PropsWithChildren<Props>) {
  const endContentRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [, isVisible] = useIntersectionObserver(endContentRef, {
    root: contentRef?.current,
    freezeOnceVisible,
  });

  useEffect(() => {
    if (isVisible) {
      handleEndOfContent?.();
    }
  }, [isVisible]);

  return (
    <div
      ref={contentRef}
      className={cn('overflow-y-auto', className)}
      style={{
        height: `${height}px`,
      }}>
      <div>{children}</div>
      <div className='py-1' ref={endContentRef} />
    </div>
  );
}
