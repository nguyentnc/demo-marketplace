import ConnectButton from "@/components/ConnectButton";
import cn from "classnames";
import Link from "next/link";
import Container from "../Container";
import Navbar from "../Navbar";

type Props = {
  className?: string;
  isContrast?: boolean;
  bannerUrl?: string;
  bannerClassName?: string;
};

function Header({ className, isContrast, bannerUrl, bannerClassName }: Props) {
  return (
    <header className={cn(["w-full", className])} id="header">
      <Container className=" relative z-headerMenu py-3">
        <div className="flex items-center justify-between space-x-6">
          <Link
            className="h-5 w-[105px] sm:h-[48px] sm:w-[151px] flex items-center"
            href="/"
          >
            <div className="text-theme-palette-4 text-2xl font-extrabold">
              Calm Down
            </div>
            {/* <img
              src={`/assets/images/${
                isContrast ? "logo.png" : "logo-white.png"
              }`}
              alt="image-logo"
              className="h-full w-full object-contain object-center"
            /> */}
          </Link>
          <Navbar className="hidden sm:flex" />

          <ConnectButton />
        </div>
      </Container>
      {bannerUrl && (
        <div
          className={cn(
            "absolute right-0 top-0  z-bannerHeader h-14 w-full sm:h-40 ",
            bannerClassName
          )}
        >
          <img src={bannerUrl} alt="header-banner" className="h-full w-full" />
        </div>
      )}
    </header>
  );
}

export default Header;
