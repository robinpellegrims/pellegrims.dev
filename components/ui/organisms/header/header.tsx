import Link from 'next/link';
import { Logo } from '@/components/ui/atoms/logo/logo';
import { FunctionComponent, useState } from 'react';
import { Nav } from '@/components/ui/molecules/nav/nav';
import { Container } from '@/components/ui/templates/container/container';

interface HeaderProps {
  links: { text: string; href: string }[];
}

export const Header: FunctionComponent<HeaderProps> = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-canvas/80 backdrop-blur-xl">
        <Container>
          <div className="flex items-center justify-between py-5">
            <Link href="/" className="group">
              <Logo />
            </Link>
            <div className="hidden md:block">
              <Nav links={links} />
            </div>
            <button
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] transition hover:bg-white/[0.08] md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block h-0.5 w-5 bg-ink transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-5 bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-5 bg-ink transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </Container>
      </header>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-500 md:hidden ${
          menuOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-canvas/95 backdrop-blur-2xl" />
        <div className="relative flex h-full flex-col items-center justify-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl tracking-wide text-ink/70 transition hover:text-accent"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
