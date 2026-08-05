import '@/styles/globals.css';
import { Footer } from '@/components/ui/organisms/footer/footer';
import { Header } from '@/components/ui/organisms/header/header';
import {
  canonicalOrigin,
  defaultSeoConfig,
  facebookProfileUrl,
  githubUrl,
  linkedInUrl,
  name,
  twitterUrl,
} from '../constants';
import Head from 'next/head';
import { generateDefaultSeo } from 'next-seo/pages';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { CounterDevAnalytics } from '@/components/ui/atoms/counter-dev-analytics/counter-dev-analytics';
import { HomeTemplate } from '@/components/ui/templates/home/home';

const headerNavLinks: { text: string; href: string }[] = [
  { text: 'Blog', href: '/blog' },
  { text: 'Snippets', href: '/snippets' },
  { text: 'Bookmarks', href: '/bookmarks' },
  { text: 'Contact', href: '/contact' },
];

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      {generateDefaultSeo({
        ...defaultSeoConfig,
        canonical: canonicalOrigin + useRouter().pathname,
      })}
    </Head>
    <CounterDevAnalytics user="RobinPel" />
    <HomeTemplate
      header={<Header links={headerNavLinks} />}
      content={<Component {...pageProps} />}
      footer={
        <Footer
          name={name}
          facebookUrl={facebookProfileUrl}
          linkedInUrl={linkedInUrl}
          twitterUrl={twitterUrl}
          githubUrl={githubUrl}
        />
      }
    />
  </>
);

export default App;
