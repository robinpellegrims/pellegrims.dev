import { FunctionComponent } from 'react';

interface PageSubtitleProps {
  subTitle: string;
}

export const PageSubtitle: FunctionComponent<PageSubtitleProps> = ({
  subTitle,
}) => (
  <p className="my-6 w-full max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
    {subTitle}
  </p>
);
