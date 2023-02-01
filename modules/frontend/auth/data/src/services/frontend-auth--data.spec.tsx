import { render } from '@testing-library/react';

import FrontendAuthData from './frontend-auth--data';

describe('FrontendAuthData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendAuthData />);
    expect(baseElement).toBeTruthy();
  });
});
