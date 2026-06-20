import { Grid } from '@/components/ui/templates/grid/grid';
import { PageTemplate } from '@/components/ui/templates/page/page';
import {
  fetchAllRaindropBookmarks,
  formatBookmarkForDisplay,
} from '../utils/raindrop';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Card } from '@/components/ui/organisms/card/card';
import type { CardProps } from '@/components/ui/organisms/card/card';
import { PageHero } from '@/components/ui/molecules/page-hero/page-hero';
import { InfiniteScroll } from '@/components/ui/atoms/infinite-scroll/infinite-scroll';
import { useMemo, useState, useEffect } from 'react';

export interface BookmarksProps {
  initialBookmarks: CardProps[];
  perPage: number;
}

const title = 'Bookmarks';

export const Bookmarks: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ initialBookmarks, perPage }) => {
  const [allBookmarks, setAllBookmarks] = useState<CardProps[]>(initialBookmarks);
  const [displayedBookmarks, setDisplayedBookmarks] = useState<CardProps[]>(() =>
    allBookmarks.slice(0, perPage)
  );
  const [isLoading, setIsLoading] = useState(false);

  // Fetch fresh bookmarks on the client
  useEffect(() => {
    fetch('/api/bookmarks')
      .then((res) => res.json() as Promise<CardProps[]>)
      .then((data) => {
        if (data && data.length > 0) {
          setAllBookmarks(data);
          setDisplayedBookmarks((prev) => {
            // Only update displayed if we are at the top, or expand it
            return data.slice(0, Math.max(prev.length, perPage));
          });
        }
      })
      .catch((err) => console.error('Failed to fetch fresh bookmarks:', err));
  }, [perPage]);

  const currentBookmarks = useMemo(() => {
    return allBookmarks.slice(0, displayedBookmarks.length || perPage);
  }, [allBookmarks, displayedBookmarks.length, perPage]);

  const hasNextPage = currentBookmarks.length < allBookmarks.length;

  const loadMore = () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);

    setTimeout(() => {
      const currentLength = currentBookmarks.length;
      const nextBatch = allBookmarks.slice(currentLength, currentLength + perPage);
      setDisplayedBookmarks((prev) => [...prev, ...nextBatch]);
      setIsLoading(false);
    }, 300);
  };

  return (
    <PageTemplate
      header={
        <PageHero
          eyebrow="Curated Links"
          title={title}
          description="Collection of links to articles and other resources I recently liked."
        />
      }
      seoProps={{ title }}
    >
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        onLoadMore={loadMore}
        threshold={200}
      >
        <Grid
          items={currentBookmarks}
          render={(bookmark) => <Card {...bookmark} />}
        />
      </InfiniteScroll>
    </PageTemplate>
  );
};

export default Bookmarks;

export const getStaticProps: GetStaticProps<BookmarksProps> = async () => {
  const perPage = 30;

  try {
    const allBookmarks = await fetchAllRaindropBookmarks();
    const formattedBookmarks = allBookmarks.map(formatBookmarkForDisplay);

    return {
      props: {
        initialBookmarks: formattedBookmarks,
        perPage,
      },
    };
  } catch (error) {
    console.error('Failed to fetch bookmarks for static generation:', error);

    return {
      props: {
        initialBookmarks: [],
        perPage,
      },
    };
  }
};
