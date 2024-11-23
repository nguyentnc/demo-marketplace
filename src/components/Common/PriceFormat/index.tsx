import React from 'react';
import cn from 'classnames';
import { useCurrency } from '@/hooks/internals';

type Props = {
  price: number;
  className?: string;
};

export const PriceFormat = ({ className, price }: Props) => {
  const { formatCurrency } = useCurrency();

  return (
    <span
      className={cn('whitespace-nowrap text-end text-lg font-bold', {
        [className || '']: !!className,
      })}>
      {formatCurrency(price)}
    </span>
  );
};
