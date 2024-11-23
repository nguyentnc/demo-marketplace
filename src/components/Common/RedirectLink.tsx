'use client';

import Link, { LinkProps } from 'next/link';

type Props = {
  children: JSX.Element;
  href: string;
} & Omit<LinkProps, 'href'>;

export const RedirectLink = ({ children, href, ...rest }: Props) => {
  return (
    <Link
      {...rest}
      href={href}
      target={href.includes(window.location.hostname) ? '_self' : '_blank'}>
      {children}
    </Link>
  );
};

export default RedirectLink;
