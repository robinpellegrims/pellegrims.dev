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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
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
