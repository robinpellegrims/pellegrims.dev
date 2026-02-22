import { HomeHero } from '@/components/ui/organisms/home-hero/home-hero';
import { Container } from '@/components/ui/templates/container/container';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { generateRssFeed } from '../utils/feed';
import { name } from '../constants';

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => (
  <Container>
    <HomeHero imageSrc="/avatar.png" name={name} contactPath="/contact" />
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed();
  return { props: {} };
};

export default Index;
