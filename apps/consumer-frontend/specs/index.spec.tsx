import { Theme } from '@realiza/frontend/shared/ui';
import { render } from '@testing-library/react';
import React from 'react';

import Index from '../pages/index';

describe('Index', () => {
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
        <Index />
      </Theme>
    );
    expect(baseElement).toBeTruthy();
  });
});
