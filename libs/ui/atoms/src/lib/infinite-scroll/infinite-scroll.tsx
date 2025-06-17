import { FunctionComponent, ReactNode } from 'react';
import { useInfiniteScroll } from './use-infinite-scroll';

export interface InfiniteScrollProps {
  hasNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  loadingIndicator?: ReactNode;
  children: ReactNode;
}

export const InfiniteScroll: FunctionComponent<InfiniteScrollProps> = ({
  hasNextPage,
  isLoading,
  onLoadMore,
  threshold = 100,
  loadingIndicator,
  children,
}) => {
  const loadingRef = useInfiniteScroll({
    hasNextPage,
    isLoading,
    onLoadMore,
    threshold,
  });

  const defaultLoadingIndicator = (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
      <span className="ml-3 text-dark-600 dark:text-dark-300">Loading more...</span>
    </div>
  );

  return (
    <>
      {children}
      {(hasNextPage || isLoading) && (
        <div ref={loadingRef} className="w-full">
          {isLoading && (loadingIndicator || defaultLoadingIndicator)}
        </div>
      )}
    </>
  );
};