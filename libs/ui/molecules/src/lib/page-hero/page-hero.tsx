import { FunctionComponent } from 'react';
import { PageSubtitle, PageTitle } from '@pellegrims-dev/ui/atoms';

interface HeroPageProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export const PageHero: FunctionComponent<HeroPageProps> = ({
  title,
  description,
  eyebrow,
}) => (
  <div className="mb-10 flex w-full flex-col items-center border-b border-ink/10 pb-8 pt-5 text-center sm:pb-10">
    {eyebrow ? (
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
        {eyebrow}
      </p>
    ) : null}
    <PageTitle title={title} />
    {description ? <PageSubtitle subTitle={description} /> : null}
  </div>
);
