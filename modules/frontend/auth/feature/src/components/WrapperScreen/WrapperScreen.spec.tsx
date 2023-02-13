import { Theme } from '@realiza/frontend/shared/ui';
import { render } from '@testing-library/react';
import React from 'react';

import { WrapperScreen } from './WrapperScreen';

describe('WrapperScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Theme>
        <WrapperScreen></WrapperScreen>
      </Theme>
    );
    expect(baseElement).toBeTruthy();
  });
});
