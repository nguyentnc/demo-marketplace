import { SCREEN_BREAK_POINT_VALUE, TScreenBreakpoint } from "@/types/common";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState, useTransition } from "react";

/**
 *
 * @param {SCREEN_BREAK_POINTE} query "sm" | "md" | "lg" | "xl" for mobile first
 *
 * - Or you can use custom media query string for specical case
 *
 */

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(getMediaQueryString(query)).matches;
    }
    return false;
  };

  const [isPending, startTransition] = useTransition();

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    startTransition(() => {
      setMatches(getMatches(query));
    });
  }

  const handleChangeDebounce = useCallback(debounce(handleChange, 150), []);

  function getMediaQueryString(query: string) {
    let mediaQuery = query;

    if (Object.keys(SCREEN_BREAK_POINT_VALUE).includes(mediaQuery)) {
      mediaQuery = `(min-width: ${
        SCREEN_BREAK_POINT_VALUE[query as TScreenBreakpoint]
      })`;
    }

    return mediaQuery;
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(getMediaQueryString(query));
    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener("change", handleChangeDebounce);

    return () => {
      matchMedia.removeEventListener("change", handleChangeDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export default useMediaQuery;
