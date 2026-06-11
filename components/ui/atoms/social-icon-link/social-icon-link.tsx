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
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-ink/70 transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
  >
    <SocialIcon type={props.iconType} />
  </Link>
);
