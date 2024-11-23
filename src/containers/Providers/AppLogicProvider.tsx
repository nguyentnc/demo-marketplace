"use client";

import { useIntersectionObserver } from "@/hooks";
import { useToast } from "@/hooks/internals";
import { ERouteChangeCompleteType } from "@/utils/helpers/router";
import { useRouter } from "next/navigation";

import { Router } from "next/router";

import { PropsWithChildren, useEffect, useRef } from "react";

type Props = {};

export function AppLogicProvider({ children }: PropsWithChildren<Props>) {
  const deferredPrompt = useRef<BeforeInstallPromptEvent>();
  const router = useRouter();
  const toast = useToast();
  const endContentRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(
    window.document.getElementById("transparent-main")
  );

  const [, isVisible] = useIntersectionObserver(endContentRef, {
    root: contentRef?.current,
    rootMargin: "40px",
  });

  function handleRouteChangeComplete(e: { type: ERouteChangeCompleteType }) {
    if (e?.type === ERouteChangeCompleteType.SESSION_NOT_EXISTED) {
      toast.info("Phiên quá hạn.");
      router.replace("/");
    }
  }

  function requestPWA(e: BeforeInstallPromptEvent) {
    deferredPrompt.current = e;
  }

  useEffect(() => {
    window.document.body.setAttribute(
      "data-header-animation",
      isVisible ? "fixed" : ""
    );
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", requestPWA as any);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      window.removeEventListener("beforeinstallprompt", requestPWA as any);
    };
  }, []);

  return (
    <>
      <div ref={endContentRef} id="textRef"></div>
      {children}
    </>
  );
}

export default AppLogicProvider;
