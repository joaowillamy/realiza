import { render } from '@testing-library/react';

import CustomForm from './custom-form';

describe('CustomForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomForm />);
    expect(baseElement).toBeTruthy();
  });
});
