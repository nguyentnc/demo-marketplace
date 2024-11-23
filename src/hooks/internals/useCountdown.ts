"use client";
import { useEffect, useRef, useState } from "react";

export const useCountdown = (targetDate: string | number) => {
  const refInterval = useRef<number>();
  const [countDown, setCountDown] = useState(
    new Date(targetDate).getTime() - new Date().getTime()
  );

  const getReturnValues = (countDown: number) => {
    // calculate time left
    if (countDown <= 0) {
      clearInterval(refInterval.current);
      return {
        countDown: 0,
        date: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      };
    }
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return { countDown, date: { days, hours, minutes, seconds } };
  };

  useEffect(() => {
    clearInterval(refInterval.current);

    const interval = setInterval(() => {
      setCountDown(new Date(targetDate).getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(countDown);
};

export default useCountdown;
