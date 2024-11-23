import cn from 'classnames';
import { SuccessIcon } from '@/components/Icons';

import { ToastProps } from '@/types/toast';

function Success({ message, className }: ToastProps) {
  return (
    <div
      className={cn([
        className,
        'flex justify-center bg-common-success/5 text-common-success',
      ])}>
      <SuccessIcon className='mr-2 h-6 w-6 shrink-0 ' />

      {message}
    </div>
  );
}

export default Success;
