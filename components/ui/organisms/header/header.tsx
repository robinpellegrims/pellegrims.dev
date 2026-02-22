import Link from 'next/link';
import { Logo } from '@/components/ui/atoms/logo/logo';
import { FunctionComponent } from 'react';
import { Nav } from '@/components/ui/molecules/nav/nav';
import { Container } from '@/components/ui/templates/container/container';

interface HeaderProps {
  links: { text: string; href: string }[];
}

export const Header: FunctionComponent<HeaderProps> = ({ links }) => (
  <header className="sticky top-0 z-20 border-b border-ink/10 bg-canvas/85 backdrop-blur">
    <Container>
      <div className="flex flex-col items-center gap-4 py-5 md:flex-row md:justify-between">
        <Link href="/" className="group">
          <Logo />
        </Link>
        <Nav links={links} />
      </div>
    </Container>
  </header>
);
