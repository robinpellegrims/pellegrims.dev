import { Grid, PageTemplate } from '@pellegrims-dev/ui/templates';
import {
  fetchAllRaindropBookmarks,
  formatBookmarkForDisplay,
} from '../utils/raindrop';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Card, CardProps } from '@pellegrims-dev/ui/organisms';
import { PageHero } from '@pellegrims-dev/ui/molecules';
import { InfiniteScroll } from '@pellegrims-dev/ui/atoms';
import { useState, useMemo } from 'react';

export interface BookmarksProps {
  allBookmarks: CardProps[];
  perPage: number;
}

const title = 'Bookmarks';

export const Bookmarks: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ allBookmarks, perPage }) => {
  const [displayedBookmarks, setDisplayedBookmarks] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentBookmarks = useMemo(() => {
    return allBookmarks.slice(0, displayedBookmarks.length || perPage);
  }, [allBookmarks, displayedBookmarks.length, perPage]);

  const hasNextPage = currentBookmarks.length < allBookmarks.length;

  const loadMore = () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);

    // Simulate network delay for smooth UX
    setTimeout(() => {
      const currentLength = currentBookmarks.length;
      const nextBatch = allBookmarks.slice(currentLength, currentLength + perPage);
      setDisplayedBookmarks(prev => [...prev, ...nextBatch]);
      setIsLoading(false);
    }, 300);
  };

  // Initialize with first page
  useMemo(() => {
    if (displayedBookmarks.length === 0) {
      setDisplayedBookmarks(allBookmarks.slice(0, perPage));
    }
  }, [allBookmarks, perPage, displayedBookmarks.length]);

  return (
    <PageTemplate
      header={
        <PageHero
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
  const perPage = 30; // Items per page

  try {
    const allBookmarks = await fetchAllRaindropBookmarks();
    const formattedBookmarks = allBookmarks.map(formatBookmarkForDisplay);

    return {
      props: {
        allBookmarks: formattedBookmarks,
        perPage,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Failed to fetch bookmarks for static generation:', error);

    // Return empty state when API fails
    return {
      props: {
        allBookmarks: [],
        perPage,
      },
      revalidate: 60, // Retry after 1 minute on error
    };
  }
};
