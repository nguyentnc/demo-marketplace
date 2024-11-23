'use client';
import { useEffect, useState } from 'react';
const DEFAULT_LIMIT = 8;

export function useClientPagination<T>(
  listData: T[],
  { limit = DEFAULT_LIMIT, delay = 300 }: { limit?: number; delay?: number }
) {
  const [page, setPage] = useState(1);

  const total = listData.length;

  function handleNext() {
    setTimeout(() => {
      setPage((old) => old + 1);
    }, delay);
  }

  function handlePre() {
    setTimeout(() => {
      setPage((old) => old + 1);
    }, delay);
  }

  function reset() {
    setPage(1);
  }

  useEffect(() => {
    reset();
  }, [listData]);

  const currentData = listData.slice(0, limit * page);
  return {
    total,
    data: currentData,
    currentPage: page,
    handleNext,
    handlePre,
    isMore: currentData.length < total,
  };
}

export default useClientPagination;
