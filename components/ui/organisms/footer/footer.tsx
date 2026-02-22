import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Logo } from '@/components/ui/atoms/logo/logo';
import { SocialIconLink } from '@/components/ui/atoms/social-icon-link/social-icon-link';
import { Container } from '@/components/ui/templates/container/container';

interface FooterProps {
  facebookUrl: string;
  linkedInUrl: string;
  name: string;
  twitterUrl: string;
  githubUrl: string;
}

export const Footer: FunctionComponent<FooterProps> = (props) => (
  <Container>
    <footer className="mt-8 border-t border-ink/10 py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <span className="inline-flex gap-2">
        <SocialIconLink
          href={props.twitterUrl}
          label="Twitter"
          iconType="twitter"
        />
        <SocialIconLink
          href={props.facebookUrl}
          label="Facebook"
          iconType="facebook"
        />
        <SocialIconLink
          href={props.linkedInUrl}
          label="LinkedIn"
          iconType="linkedin"
        />
        <SocialIconLink
          href={props.githubUrl}
          label="Github"
          iconType="github"
        />
        </span>
        <div className="text-center sm:text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
            © {new Date().getFullYear()} {props.name}
          </p>
          <p className="mt-1 text-sm text-ink/70">Crafting useful digital products.</p>
        </div>
        <Link href="/" className="group">
          <Logo end={true} />
        </Link>
      </div>
    </footer>
  </Container>
);
