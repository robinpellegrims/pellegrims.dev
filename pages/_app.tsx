import 'tailwindcss/tailwind.css';
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
import { DefaultSeo } from 'next-seo';
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
    <DefaultSeo
      {...defaultSeoConfig}
      canonical={canonicalOrigin + useRouter().pathname}
    />
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
