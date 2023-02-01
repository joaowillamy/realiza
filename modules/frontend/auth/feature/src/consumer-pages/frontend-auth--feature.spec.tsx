import { render } from '@testing-library/react';

import FrontendAuthFeature from './frontend-auth--feature';

describe('FrontendAuthFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendAuthFeature />);
    expect(baseElement).toBeTruthy();
  });
});
