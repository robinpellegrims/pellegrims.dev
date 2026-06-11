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
  <section className="py-3 sm:py-8">
    <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div className="animate-fade-up">
        <div className="mb-4 flex items-center gap-3 sm:mb-6">
          <span className="h-px w-8 bg-gradient-to-r from-accent/0 to-accent sm:w-12" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-bright sm:text-[13px] sm:tracking-[0.26em]">
            Senior Frontend & Full-Stack
          </p>
        </div>
        <h1 className="max-w-3xl font-display text-[2.4rem] leading-[1.05] sm:text-5xl sm:leading-[1.08] lg:text-[4.2rem]">
          <span className="block bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text pb-1 text-transparent drop-shadow-sm">
            {name}
          </span>
        </h1>
        <p className="mt-4 max-w-[32ch] text-lg font-medium leading-snug text-ink/90 sm:mt-5 sm:text-2xl">
          Frontend specialist delivering end-to-end full-stack solutions.
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:mt-6 sm:max-w-2xl sm:text-lg">
          I help product teams move from messy requirements to stable releases.
          You get thoughtful UX, solid architecture, and pragmatic
          implementation across the stack.
        </p>
        
        <div className="mt-6 flex items-center gap-3 sm:mt-8">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-80"></span>
            <span className="relative inline-flex h-full w-full rounded-full bg-accent shadow-[0_0_10px_rgba(201,145,60,0.8)]"></span>
          </span>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent-bright sm:text-xs">
            Available for select collaborations
          </p>
        </div>
        <div className="mt-8 flex flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:items-center">
          <Link
            href={contactPath}
            className="group flex w-full items-center justify-center sm:w-auto [&>button]:w-full sm:[&>button]:w-auto"
          >
            <Button text="Start a project" type="primary" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/[0.12] bg-surface-bright/50 px-7 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-ink/90 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface-bright hover:text-accent sm:w-auto"
          >
            Read engineering notes
          </Link>
        </div>
      </div>
      <aside className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:120ms] [animation-fill-mode:both] sm:max-w-md">

        {/* Floating Portrait & Text */}
        <div className="relative z-10 flex flex-col items-center pt-6 sm:pt-10">
          {/* Avatar Ring */}
          <div className="relative mx-auto w-fit rounded-full p-3 sm:p-4">
             {/* Decorative outer glow & rings */}
             <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-accent/30" />
             <div className="absolute inset-2 rounded-full border border-accent/20 bg-accent/[0.02] backdrop-blur-sm" />
             
             {/* Avatar */}
             <div className="relative z-10 h-52 w-52 overflow-hidden rounded-full border border-white/[0.12] bg-surface shadow-[0_0_50px_-12px_rgba(201,145,60,0.25)] sm:h-64 sm:w-64">
                <Image
                  alt={`${name} portrait`}
                  src={imageSrc}
                  fill
                  priority
                  sizes="(min-width: 640px) 256px, 208px"
                  className="object-cover object-[50%_24%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_50%,rgba(9,9,11,0.4)_100%)]" />
             </div>
          </div>
          

        </div>
      </aside>
    </div>
  </section>
);
