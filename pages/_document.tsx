import { Head, Html, Main, NextScript } from 'next/document';
import { feedRss2Filename, name, rssFolder } from '../constants';
import { FavIcon } from '@/components/ui/atoms/favicon/favicon';

export const MyDocument = () => (
  <Html className="bg-canvas font-body text-ink">
    <Head>
      <meta charSet="utf-8" />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={name}
        href={`/${rssFolder}/${feedRss2Filename}`}
      />
      <FavIcon pathPrefix="/favicon" />
    </Head>
    <body className="bg-canvas">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
