import { render } from '@testing-library/react';

import WrapperAuth from './WrapperAuth';

describe('WrapperAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WrapperAuth title={''} describe={''}></WrapperAuth>);
    expect(baseElement).toBeTruthy();
  });
});
