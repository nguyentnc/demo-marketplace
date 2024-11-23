'use client';
import { useEffect, useState } from 'react';

export function useDebounceValue<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debounding, setDebounding] = useState(true);

  useEffect(() => {
    setDebounding(true);

    const handler = setTimeout(() => {
      setDebounding(false);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return { debouncedValue, debounding };
}

export default useDebounceValue;
