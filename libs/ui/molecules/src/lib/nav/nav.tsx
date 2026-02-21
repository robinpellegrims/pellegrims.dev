import { FunctionComponent } from 'react';
import { NavItem, NavItemProps } from '@pellegrims-dev/ui/atoms';

interface NavProps {
  links: NavItemProps[];
}

export const Nav: FunctionComponent<NavProps> = ({ links }) => (
  <nav className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium tracking-[0.16em] uppercase text-ink/70 md:justify-end">
    {links.map((link) => (
      <NavItem key={link.href} {...link} />
    ))}
  </nav>
);
