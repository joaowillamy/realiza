import { render } from '@testing-library/react';

import FrontendSharedForm from './frontend-shared--form';

describe('FrontendSharedForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendSharedForm />);
    expect(baseElement).toBeTruthy();
  });
});
