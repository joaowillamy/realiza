import { render } from '@testing-library/react';

import Authentication from './authentication';

describe('Authentication', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Authentication />);
    expect(baseElement).toBeTruthy();
  });
});
