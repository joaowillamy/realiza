import { render } from '@testing-library/react';

import WrapperAuth from './wrapperAuth';

describe('WrapperAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WrapperAuth></WrapperAuth>);
    expect(baseElement).toBeTruthy();
  });
});
