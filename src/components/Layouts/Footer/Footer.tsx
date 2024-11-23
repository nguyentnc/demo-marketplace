import cn from "classnames";
import Link from "next/link";
import Container from "../Container";
import CollapseCategory from "./CollapseCategory";
type Props = {
  className?: string;
};

const footerLinkList = [
  {
    category: "Deserunt tempor amet nulla.",
    links: [
      { label: "Lorem ipsum dolor sit.", url: "#" },
      { label: "Lorem ipsum dolor sit amet.", url: "#" },
    ],
  },
  {
    category: "Marketplace",
    links: [
      { label: "Lorem, ipsum.", url: "#" },
      { label: "Lorem, ipsum dolor.", url: "#" },
    ],
  },
];

function Footer({ className }: Props) {
  return (
    <div className={cn("w-full bg-theme-palette-1", className)}>
      <Container className="space-y-10  py-10">
        <div className="hidden border-b pb-10 sm:flex">
          {footerLinkList.map((category, indexCategory) => {
            return (
              <div className="flex-1 space-y-4" key={indexCategory}>
                <div className="text-md font-semibold">{category.category}</div>
                <div className=" flex flex-col space-y-2">
                  {category.links.map((link, indexLink) => {
                    return (
                      <Link key={indexLink} href={link.url}>
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:hidden">
          {footerLinkList.map((category, index) => {
            return (
              <div className="border-b pb-6" key={index}>
                <CollapseCategory
                  category={category.category}
                  links={category.links}
                  className={index !== 0 ? "pt-6" : ""}
                />
              </div>
            );
          })}
        </div>
        <div className="text-center text-md">
          <span>Copyright © 2023 Marketplace.vn. </span>
          <br className="sm:hidden" />
          <span>All rights reserved</span>
          <br />
          <span>Site Operator: Calm Down Marketplace</span>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
