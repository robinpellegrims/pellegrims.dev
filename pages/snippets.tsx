import { getMarkdownDocuments } from '@/lib/markdown/markdown';
import { twitterUserName } from '../constants';
import { List } from '@/components/ui/templates/list/list';
import { PageTemplate } from '@/components/ui/templates/page/page';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { PageHero } from '@/components/ui/molecules/page-hero/page-hero';
import { BlogArticle } from '@/components/ui/organisms/blog-article/blog-article';
import type { BlogArticleProps } from '@/components/ui/organisms/blog-article/blog-article';
import { sortArticlesByDateDesc } from '../utils/sort';
import { SNIPPETS_PATH } from '../utils/paths';

interface SnippetsProps {
  snippets: BlogArticleProps[];
}

const Snippets: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  snippets,
}) => (
  <PageTemplate
    seoProps={{ title: 'Snippets' }}
    header={
      <PageHero
        eyebrow="Code Snippets"
        title="Snippets"
        description="Compact technical references, patterns, and reminders I reuse in day-to-day engineering work."
      />
    }
  >
    <List items={snippets} render={(article) => <BlogArticle {...article} />} />
  </PageTemplate>
);

export const getStaticProps: GetStaticProps<SnippetsProps> = async () => {
  const snippets = getMarkdownDocuments(SNIPPETS_PATH);

  return {
    props: {
      snippets: snippets
        .map((snippet) => ({
          markDown: snippet,
          twitterUserName,
        }))
        .sort(sortArticlesByDateDesc),
    },
  };
};

export default Snippets;
