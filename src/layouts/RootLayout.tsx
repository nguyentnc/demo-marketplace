import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
});
type Props = {};

export default function RootLayout({ children }: PropsWithChildren<Props>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} group`}
        suppressHydrationWarning={true}
        data-header-animation="fixed"
      >
        {children}

        <div id="calender-portal"></div>
      </body>
    </html>
  );
}
