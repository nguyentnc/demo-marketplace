'use client';
import { useCountdown } from '@/hooks/internals';
import React, { useEffect } from 'react';

type Props = {
  dueTime: string | number;
  onTimeOut: () => void;
  className?: string;
};

export const Countdown = ({ dueTime, onTimeOut, className }: Props) => {
  const {
    countDown,
    date: { days, hours, minutes, seconds },
  } = useCountdown(dueTime);

  useEffect(() => {
    if (countDown <= 0) {
      onTimeOut();
    }
  }, [countDown]);

  return countDown === 0 ? (
    <span className={className}>Hết thời gian</span>
  ) : (
    <span className={className}>
      {days && days >= 0 ? `${days}d ` : ''}
      {hours > 0 && `${hours > 0 && hours <= 9 ? '0' + hours : hours}:`}
      {`${minutes <= 9 && minutes >= 0 ? '0' + minutes + ':' : minutes + ':'}`}
      {`${seconds <= 9 && seconds >= 0 ? '0' + seconds : seconds}`}
    </span>
  );
};

export default Countdown;
