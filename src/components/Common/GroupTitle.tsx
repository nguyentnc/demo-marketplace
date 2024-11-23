import { PropsWithChildren } from 'react';

type Props = {
  title: string;
  className?: string;
};

export default function GroupTitle({
  title,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={className}>
      <div className='mb-2 text-2xl'>{title}</div>
      {children}
    </div>
  );
}
