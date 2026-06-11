import { FunctionComponent } from 'react';
import Link from 'next/link';

export interface NavItemProps {
  text: string;
  href: string;
}

export const NavItem: FunctionComponent<NavItemProps> = ({ text, href }) => (
  <Link
    key={href}
    href={href}
    className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-white/[0.1] hover:bg-white/[0.06] hover:text-ink"
  >
    {text}
  </Link>
);
