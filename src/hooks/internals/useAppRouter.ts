"use client";
import { useRouter } from "next/navigation";

import { UrlObject } from "url";

type Url = UrlObject | string;

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
}

export const useAppRouter = () => {
  const router = useRouter();

  async function push(
    // ...arg: [url: Url, as?: Url, options?: TransitionOptions]
    ...arg: Parameters<typeof router.push>
  ) {
    router.push(...arg);
  }

  async function replace(
    // ...arg: [url: Url, as?: Url, options?: TransitionOptions]
    ...arg: Parameters<typeof router.replace>
  ) {
    router.replace(...arg);
  }

  // Use to change url but not trigger nextJS router
  function shallow(url: string) {
    history.replaceState(null, "", url);
  }

  return {
    ...router,
    push: push,
    replace: replace,
    shallow,
  };
};

export default useAppRouter;
