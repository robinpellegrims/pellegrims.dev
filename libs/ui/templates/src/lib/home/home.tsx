import { FunctionComponent, ReactElement } from 'react';

interface HomeTemplateProps {
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}

export const HomeTemplate: FunctionComponent<HomeTemplateProps> = ({
  header,
  content,
  footer,
}) => (
  <div className="relative min-h-screen overflow-hidden bg-canvas text-ink">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(157,94,47,0.18),transparent_42%),radial-gradient(circle_at_12%_86%,rgba(31,33,38,0.08),transparent_50%)]" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),transparent)]" />
    <div className="relative z-10 flex min-h-screen flex-col">
      {header}
      <main className="flex flex-auto flex-col justify-center py-10 sm:py-14">
        {content}
      </main>
      {footer}
    </div>
  </div>
);
