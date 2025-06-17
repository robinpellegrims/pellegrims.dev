import { render, screen } from '@testing-library/react';
import { InfiniteScroll } from './infinite-scroll';

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('InfiniteScroll', () => {
  const defaultProps = {
    hasNextPage: true,
    isLoading: false,
    onLoadMore: jest.fn(),
  };

  it('should render children', () => {
    render(
      <InfiniteScroll {...defaultProps}>
        <div>Test content</div>
      </InfiniteScroll>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should show loading indicator when loading', () => {
    render(
      <InfiniteScroll {...defaultProps} isLoading={true}>
        <div>Test content</div>
      </InfiniteScroll>
    );

    expect(screen.getByText('Loading more...')).toBeInTheDocument();
  });

  it('should show custom loading indicator when provided', () => {
    render(
      <InfiniteScroll 
        {...defaultProps} 
        isLoading={true}
        loadingIndicator={<div>Custom loading...</div>}
      >
        <div>Test content</div>
      </InfiniteScroll>
    );

    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });

  it('should not show loading indicator when hasNextPage is false and not loading', () => {
    render(
      <InfiniteScroll {...defaultProps} hasNextPage={false}>
        <div>Test content</div>
      </InfiniteScroll>
    );

    expect(screen.queryByText('Loading more...')).not.toBeInTheDocument();
  });
});