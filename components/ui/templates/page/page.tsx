import { FunctionComponent, ReactElement } from 'react';
import Head from 'next/head';
import { generateNextSeo, NextSeoProps } from 'next-seo/pages';
import { Container } from '../container/container';

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
    <Head>{generateNextSeo(seoProps)}</Head>
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
