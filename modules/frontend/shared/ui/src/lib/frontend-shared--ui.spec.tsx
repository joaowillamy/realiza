import { render } from '@testing-library/react';

import FrontendSharedUi from './frontend-shared--ui';

describe('FrontendSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
