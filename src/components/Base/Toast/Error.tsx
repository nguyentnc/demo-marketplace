import cn from 'classnames';
// import ErrorIcon from '@/icons/toast/error.svg';

import { ToastProps } from '@/types/toast';
import { ErrorIcon } from '@/components/Icons';

function Error({ message, className }: ToastProps) {
  return (
    <div
      className={cn([
        className,
        'flex items-center bg-common-error/5 text-common-error',
      ])}>
      <ErrorIcon className='mr-2 h-6 w-6 shrink-0 ' />
      <div>{message}</div>
    </div>
  );
}

export default Error;
