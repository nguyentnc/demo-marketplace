import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import cn from "classnames";
import { PropsWithChildren } from "react";
export default function TransparentLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="root-layout">
      <Header
        className={cn([
          "-z-1 fixed left-0 top-0  !pb-0 opacity-0 duration-300",
          "group-data-[header-animation=fixed]:z-header group-data-[header-animation=fixed]:opacity-100",
        ])}
      />
      <Header
        isContrast
        className={cn([
          "-z-1 fixed left-0 top-0 border-b border-b-theme-black/20 text-theme-black shadow-md",
          "text-theme-black opacity-0 transition-all duration-300 ease-out",
          'group-data-[header-animation=""]:z-header group-data-[header-animation=""]:bg-theme-palette-2 group-data-[header-animation=""]:opacity-100',
          'group-data-[header-animation=""]:pb-0 group-data-[header-animation=""]:pt-0 ',
        ])}
      />
      <main
        className="min-h-[calc(100vh-60px)] max-w-full"
        id="transparent-main"
      >
        {children}
      </main>
      <Footer className="" />
    </div>
  );
}
