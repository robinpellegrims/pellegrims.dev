import Image from 'next/image';
import { Button } from '@/components/ui/atoms/button/button';
import { FunctionComponent } from 'react';
import Link from 'next/link';

interface HomeHeroProps {
  imageSrc: string;
  name: string;
  contactPath: string;
}

export const HomeHero: FunctionComponent<HomeHeroProps> = ({
  imageSrc,
  name,
  contactPath,
}) => (
  <section className="py-6 sm:py-10">
    <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div className="animate-fade-up">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.26em] text-accent">
          Senior Frontend and Full-Stack Engineering
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
          <span className="block">{name}</span>
          <span className="mt-2 block text-[0.55em] font-sans font-medium leading-snug text-ink/80 sm:text-[0.52em]">
            Frontend specialist delivering end-to-end full-stack solutions.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
          I help product teams move from messy requirements to stable releases.
          You get thoughtful UX, solid architecture, and pragmatic
          implementation across the stack.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href={contactPath}>
            <Button text="Start a project conversation" type="primary" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-ink/25 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
          >
            Read engineering notes
          </Link>
        </div>
      </div>
      <aside className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:120ms] [animation-fill-mode:both]">
        <div className="absolute -inset-2 rounded-[2rem] border border-accent/20 bg-gradient-to-b from-accent/10 to-transparent" />
        <div className="relative rounded-[2rem] border border-ink/15 bg-white/80 p-6 shadow-[0_24px_80px_-55px_rgba(31,33,38,0.8)] backdrop-blur">
          <div className="mx-auto w-fit rounded-full border border-accent/25 bg-gradient-to-b from-accent/10 to-white p-2.5">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border border-ink/15 bg-mist/40 shadow-[0_20px_45px_-30px_rgba(31,33,38,0.95)]">
              <Image
                alt={`${name} portrait`}
                src={imageSrc}
                fill
                priority
                sizes="256px"
                className="object-cover object-[50%_24%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_55%,rgba(31,33,38,0.16)_100%)]" />
            </div>
          </div>
          <p className="mt-5 border-t border-ink/10 pt-4 text-sm leading-relaxed text-ink/75">
            &ldquo;I solve the right product problem first, then deliver code
            that is clear, stable, and easy for teams to extend.&rdquo;
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Available for select collaborations
          </p>
        </div>
      </aside>
    </div>
  </section>
);
