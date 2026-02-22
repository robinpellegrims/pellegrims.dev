import { FunctionComponent } from 'react';

interface LogoProps {
  end?: boolean;
}

export const Logo: FunctionComponent<LogoProps> = ({ end }) => (
  <div className="font-mono text-[0.82rem] font-medium tracking-[0.26em] text-ink transition group-hover:text-accent sm:text-[0.9rem]">
    <span className="text-accent/90">
      &lt;
      {end ? '/' : ''}
    </span>
    pellegrims.dev
    <span className="text-accent/90">&gt;</span>
  </div>
);
