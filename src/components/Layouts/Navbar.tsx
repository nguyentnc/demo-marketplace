import cn from "classnames";
import Link from "../Base/Link";

type Props = {
  isContrast?: boolean;
  className?: string;
};

export function Navbar({ isContrast, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-1 justify-start space-x-4 font-semibold ",
        {
          "text-white": !isContrast,
        },
        className
      )}
    >
      {/* <Link href='/explore' className='px-3 py-2 hover:text-theme-palette-5'>
        Explore
      </Link> */}
      <Link href="/inventory" className="px-3 py-2 hover:text-theme-palette-5">
        Inventory
      </Link>

      <Link href="/collection" className="px-3 py-2 hover:text-theme-palette-5">
        Mint NFT
      </Link>
    </div>
  );
}

export default Navbar;
