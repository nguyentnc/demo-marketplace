import cn from 'classnames';

import { ToastProps } from '@/types/toast';
import { InfoIcon } from '@/components/Icons';

function Warning({ message, className }: ToastProps) {
  return (
    <div className={cn([className, 'bg-common-warning/5 text-common-warning'])}>
      <InfoIcon className='mr-2 h-6 w-6 shrink-0 ' />
      {message}
    </div>
  );
}

export default Warning;
