'use client';
import cn from 'classnames';
import { ITooltip, Tooltip as TooltipCpn } from 'react-tooltip';

export const Tooltip = ({
  children,
  className,

  ...rest
}: ITooltip) => {
  return (
    <TooltipCpn
      className={cn('!z-tooltip bg-white !opacity-100', className)}
      variant='light'
      closeOnScroll={true}
      {...rest}>
      {children}
    </TooltipCpn>
  );
};
