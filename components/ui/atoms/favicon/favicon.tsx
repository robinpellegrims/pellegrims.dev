import { FunctionComponent } from 'react';

const faviconVersion = '20260221';

export const FavIcon: FunctionComponent<{ pathPrefix?: string }> = ({
  pathPrefix,
}) => (
  <>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${pathPrefix}/apple-touch-icon.png?v=${faviconVersion}`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`${pathPrefix}/favicon-32x32.png?v=${faviconVersion}`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`${pathPrefix}/favicon-16x16.png?v=${faviconVersion}`}
    />
    <link
      rel="manifest"
      href={`/site.webmanifest?v=${faviconVersion}`}
    />
    <link
      rel="shortcut icon"
      href={`${pathPrefix}/favicon-32x32.png?v=${faviconVersion}`}
    />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta
      name="msapplication-config"
      content={`${pathPrefix}/browserconfig.xml?v=${faviconVersion}`}
    />
    <meta name="theme-color" content="#ffffff" />
  </>
);
