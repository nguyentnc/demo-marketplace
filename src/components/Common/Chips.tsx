import cn from 'classnames';
import { ReactNode } from 'react';
import { CloseIcon } from '@/components/Icons';

// enum ChipsVariant {
//     OUTLINED = 'outlined'
// };

type Props = {
  labelContainerClassName?: string;
  label: string;
  labelClassName?: string;
  description?: string;
  descriptionClassName?: string;
  className?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  showCloseIcon?: boolean;
  onClick?: (e: any) => void;
};

export const Chips = ({
  className,
  labelContainerClassName,
  label = '-',
  labelClassName,
  description,
  descriptionClassName,
  prefixIcon,
  suffixIcon,
  active = false,
  disabled = false,
  showCloseIcon = false,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center justify-center space-x-2 rounded-lg border border-theme-black/10 bg-theme-white px-3 py-2 text-theme-black duration-300',
        'hover:border-primary-variant-1 hover:text-primary-variant-1',
        'active:border-primary active:text-primary',
        className,
        {
          '!border-primary !text-primary': active,
          '!cursor-not-allowed border-theme-white-variant-3 bg-theme-white-variant-3 text-theme-black/30 hover:border-theme-white-variant-3 hover:bg-theme-white-variant-3 hover:text-theme-black/30 active:border-theme-white-variant-3 active:text-theme-black/30':
            disabled,
        }
      )}
      onClick={disabled ? () => {} : onClick}>
      {prefixIcon && (
        <div className='flex h-6 w-6 items-center justify-center'>
          {prefixIcon}
        </div>
      )}

      <div className={cn('flex flex-col space-y-1', labelContainerClassName)}>
        <span className={cn('', labelClassName)}>{label}</span>
        {description && (
          <span className={cn('', descriptionClassName)}>{description}</span>
        )}
      </div>
      {suffixIcon ? (
        !showCloseIcon ? (
          <div className='flex h-6 w-6 items-center justify-center'>
            {suffixIcon}
          </div>
        ) : (
          <div className='flex items-center space-x-2'>
            <div className='flex h-6 w-6 items-center justify-center'>
              {suffixIcon}
            </div>
            <div className='flex h-6 w-6 items-center justify-center'>
              <CloseIcon />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};
export default Chips;
