import Link from 'next/link';
import { FunctionComponent } from 'react';
import { SocialIcon, SocialIconType } from '../social-icon/social-icon';

interface SocialIconProps {
  href: string;
  iconType: SocialIconType;
  label: string;
}

export const SocialIconLink: FunctionComponent<SocialIconProps> = (props) => (
  <Link
    href={props.href}
    rel="noopener noreferrer"
    target="_blank"
    aria-label={props.label}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-white/70 text-ink/80 transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
  >
    <SocialIcon type={props.iconType} />
  </Link>
);
