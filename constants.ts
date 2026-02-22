import { NextSeoProps } from 'next-seo';
import { getCurrentOrigin } from './utils/url';

export const facebookUserName = 'robin.pellegrims';
export const facebookProfileUrl = `https://www.facebook.com/${facebookUserName}`;
export const githubUrl = 'https://github.com/robinpellegrims';
export const linkedInUrl = 'https://www.linkedin.com/in/robinpellegrims';
export const twitterUrl = 'https://twitter.com/robinpel';
export const twitterUserName = 'robinpel';
export const twitterHandle = `@${twitterUserName}`;
export const canonicalDomain = 'www.pellegrims.dev';
export const canonicalOrigin = `https://${canonicalDomain}`;
const firstName = 'Robin';
const lastName = 'Pellegrims';
export const name = `${firstName} ${lastName}`;
export const description =
  'Frontend specialist delivering end-to-end full-stack solutions.';
export const avatarPngUrl = `${getCurrentOrigin()}/avatar.png`;
export const defaultSeoConfig: NextSeoProps = {
  defaultTitle: name,
  description,
  openGraph: {
    title: name,
    type: 'website',
    url: canonicalOrigin,
    site_name: name,
    profile: { firstName, lastName, username: facebookProfileUrl },
    images: [{ url: avatarPngUrl, height: 560, width: 548 }],
  },
  twitter: {
    handle: twitterHandle,
    site: twitterHandle,
    cardType: 'summary_large_image',
  },
};
export const oGImageWidth = 1200;
export const oGImageHeight = 630;
export const rssFolder = 'rss';
export const feedRss2Filename = `feed.xml`;
export const feedJsonFilename = `feed.json`;
export const feedAtomFilename = `atom.xml`;
export const feedAuthor = { name, link: twitterUrl };
