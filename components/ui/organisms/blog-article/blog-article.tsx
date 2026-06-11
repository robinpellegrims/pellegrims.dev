import type { MarkdownDocument } from '@/lib/markdown/markdown.model';
import { Markdown } from '@/components/ui/molecules/markdown/markdown';
import { Tags } from '@/components/ui/molecules/tags/tags';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import { SocialIcon } from '@/components/ui/atoms/social-icon/social-icon';
import { DateFormatted } from '@/components/ui/atoms/date-formatted/date-formatted';
import Image from 'next/image';

export interface BlogArticleProps {
  markDown: MarkdownDocument;
  twitterUserName: string;
  urlToShare?: string;
}

const shareOnTwitter = 'Share on twitter' as const;

export const BlogArticle: FunctionComponent<BlogArticleProps> = ({
  markDown,
  twitterUserName,
  urlToShare,
}) => (
  <article className="mx-auto w-full max-w-3xl">
    <header className="flex flex-col">
      <div className="mb-6 flex flex-col gap-3 border-b border-white/[0.06] pb-6">
        <div className="flex w-full flex-wrap items-center justify-between gap-2 text-sm text-ink/65">
          <span className="font-mono uppercase tracking-[0.08em]">
            {markDown.frontMatter.date ? (
              <DateFormatted date={new Date(markDown.frontMatter.date)} />
            ) : null}
            {markDown.frontMatter.updateDate ? (
              <>
                {' '}
                (last update:{' '}
                <DateFormatted
                  date={new Date(markDown.frontMatter.updateDate)}
                />
                )
              </>
            ) : null}
          </span>
          <span className="font-mono uppercase tracking-[0.08em]">
            {markDown.readingTimeMins} min read
          </span>
        </div>
        <Tags tags={markDown.frontMatter.tags ?? []} />
      </div>
      <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        {markDown.frontMatter.title}
      </h1>
      {markDown.frontMatter.coverImage ? (
        <div className="relative mb-8 mt-8 h-[21rem] overflow-hidden rounded-2xl border border-white/[0.06] sm:h-[31rem]">
          <Image
            src={markDown.frontMatter.coverImage}
            alt="cover image"
            loading="eager"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : null}
    </header>
    <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink/85 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent/60 prose-blockquote:text-ink/70 prose-strong:text-ink prose-pre:bg-transparent prose-pre:p-0 prose-pre:shadow-none prose-code:text-accent-bright prose-hr:border-white/[0.06]">
      <Markdown markDown={markDown} />
    </div>
    {urlToShare ? (
      <footer className="mt-16 border-t border-white/[0.06] pt-6">
        <Link
          href={`https://twitter.com/intent/tweet?text=${markDown.frontMatter.title}&via=${twitterUserName}&url=${urlToShare}`}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={shareOnTwitter}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-medium text-ink transition hover:border-accent/40 hover:text-accent"
        >
          <SocialIcon type="twitter" />
          {shareOnTwitter}
        </Link>
      </footer>
    ) : null}
  </article>
);
