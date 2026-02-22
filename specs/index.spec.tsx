import React from 'react';
import { render } from '@testing-library/react';
jest.mock('../utils/feed', () => ({
  getLatestBlogPosts: jest.fn().mockResolvedValue([]),
  getLatestSnippets: jest.fn().mockResolvedValue([]),
}));
import Index from '../pages/index';
describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
