"use client";
import { useAppRouter } from "@/hooks/internals";
import cn from "classnames";
import { PropsWithChildren } from "react";

type Props = {
  href: string;
  className?: string;
  target?: string;
};

function Link({ href, className, children, target }: PropsWithChildren<Props>) {
  const router = useAppRouter();
  function handleClick() {
    if (target) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  }
  return (
    <div onClick={handleClick} className={cn(["cursor-pointer", className])}>
      {children}
    </div>
  );
}

export default Link;
