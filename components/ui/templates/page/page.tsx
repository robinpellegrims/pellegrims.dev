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
        <div className="relative">
          {header}
          {children}
        </div>
      </Container>
    </section>
  </>
);
