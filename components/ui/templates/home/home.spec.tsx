import { render } from '@testing-library/react';
import { HomeTemplate } from './home';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

describe('HomeTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HomeTemplate
        header={<>Header</>}
        content={<>Content</>}
        footer={<>Footer</>}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
