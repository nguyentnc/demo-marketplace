import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import cn from "classnames";
import { PropsWithChildren } from "react";

type Props = {
  footerClassName?: string;
  mainClassName?: string;
};

export default function FixedLayout({
  children,
  mainClassName,
  footerClassName,
}: PropsWithChildren<Props>) {
  return (
    <div className="root-layout z-0 ">
      <Header
        className={cn([
          'left-0 top-0 hidden group-data-[header-animation=""]:sm:mb-6 group-data-[header-animation=""]:sm:block bg-theme-palette-2 shadow-md',
        ])}
        isContrast
      />
      <Header
        isContrast
        className={cn([
          'left-0 top-0 group-data-[header-animation=""]:fixed group-data-[header-animation=""]:z-header-mobile bg-theme-palette-2',
        ])}
        bannerClassName='group-data-[header-animation=""]:h-full'
      />

      <main
        className={cn(
          "relative z-mainFixedlayout min-h-[calc(100vh_-_60px_-_299px)] max-w-full",
          mainClassName
        )}
      >
        {children}
      </main>
      <Footer className={cn("relative md:z-footer", footerClassName)} />
    </div>
  );
}
