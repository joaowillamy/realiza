import { render } from '@testing-library/react';

import WrapperScreen from './WrapperScreen';

describe('WrapperScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WrapperScreen></WrapperScreen>);
    expect(baseElement).toBeTruthy();
  });
});
