import { DateFormatted } from '@/components/ui/atoms/date-formatted/date-formatted';
import { Tags } from '@/components/ui/molecules/tags/tags';
import { FunctionComponent, HTMLAttributeAnchorTarget, useState } from 'react';
import Image from 'next/image';
import type { DateString } from '@/lib/markdown/markdown.model';

export interface CardProps {
  title: string;
  link: string;
  linkTarget: HTMLAttributeAnchorTarget;
  cover: string;
  tags: string[];
  excerpt: string;
  created?: DateString;
}

export const Card: FunctionComponent<CardProps> = (props) => {
  const [imageError, setImageError] = useState(false);
  const hasValidCover =
    props.cover &&
    props.cover.trim() !== '' &&
    props.cover !== 'undefined' &&
    props.cover !== 'null' &&
    !imageError;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/85 shadow-[0_20px_50px_-45px_rgba(31,33,38,0.95)] transition hover:-translate-y-1 hover:border-accent/35">
      {hasValidCover ? (
        <div className="relative h-64 sm:h-72 md:h-52 lg:h-60">
          {props.cover.startsWith('/') ? (
            <Image
              src={props.cover}
              alt="cover image"
              loading="lazy"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              aria-hidden="true"
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${props.cover})` }}
            />
          )}
        </div>
      ) : (
        <div className="h-64 sm:h-72 md:h-52 lg:h-60 bg-mist/35" />
      )}
      <div className="flex flex-grow flex-col gap-4 p-6">
        <Tags tags={props.tags} />
        <h2 className="font-display text-2xl leading-tight text-ink">
          {props.title}
        </h2>
        <p className="line-clamp-3 grow leading-relaxed text-ink/75">
          {props.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <a
            href={props.link}
            target={props.linkTarget}
            className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.15em] text-accent"
            rel="noreferrer"
          >
            Read more
            <svg
              className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
          {props.created ? (
            <span className="inline-flex items-center text-sm leading-none text-ink/55">
              <DateFormatted date={new Date(props.created)} />
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};
