import { render } from '@testing-library/react';

import Theme from '../theme/theme';
import Menu from './menu';

describe('Menu', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <Theme>
        <Menu />
      </Theme>
    );
    expect(baseElement).toBeTruthy();
  });
});
