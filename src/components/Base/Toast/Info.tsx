import cn from 'classnames';

import { ToastProps } from '@/types/toast';
import { InfoIcon } from '@/components/Icons';

function Info({ message, className }: ToastProps) {
  return (
    <div className={cn([className, 'bg-common-info/5 text-common-info'])}>
      <InfoIcon className='mr-2 h-6 w-6 shrink-0 ' />
      {message}
    </div>
  );
}

export default Info;
