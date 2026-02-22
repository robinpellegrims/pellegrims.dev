import { FunctionComponent, ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import { Container } from '../container/container';
import { NextSeoProps } from 'next-seo/lib/types';

interface PageTemplateProps {
  seoProps: NextSeoProps;
  header: ReactElement;
  children?: ReactElement;
}

export const PageTemplate: FunctionComponent<PageTemplateProps> = ({
  seoProps,
  header,
  children,
}) => (
  <>
    <NextSeo {...seoProps} />
    <section className="relative pb-20 pt-6 sm:pt-10">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/70 p-5 shadow-[0_20px_80px_-65px_rgba(31,33,38,0.9)] backdrop-blur sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            {header}
            {children}
          </div>
        </div>
      </Container>
    </section>
  </>
);
