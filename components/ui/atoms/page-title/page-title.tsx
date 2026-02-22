import { FunctionComponent } from 'react';

interface PageTitleProps {
  title: string;
}

export const PageTitle: FunctionComponent<PageTitleProps> = ({ title }) => (
  <>
    <h1 className="mb-3 font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl">
      {title}
    </h1>
    <div className="h-1 w-24 rounded-full bg-accent/70" />
  </>
);
