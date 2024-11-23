import cn from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  id?: string;
};

function Container({ children, className, fluid, id }: Props) {
  return (
    <div
      id={id}
      className={cn(
        'container mx-auto max-w-[min(100%,1440px)]',
        fluid ? 'max-w-[min(100%,1920px)] px-0' : '',
        className
      )}>
      {children}
    </div>
  );
}

export default Container;
