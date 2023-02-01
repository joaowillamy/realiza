import { render } from '@testing-library/react';

import FrontendSharedUiForm from './frontend-shared--ui-form';

describe('FrontendSharedUiForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendSharedUiForm />);
    expect(baseElement).toBeTruthy();
  });
});
