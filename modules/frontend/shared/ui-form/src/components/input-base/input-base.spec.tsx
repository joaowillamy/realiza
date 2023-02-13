import { Theme } from '@realiza/frontend/shared/ui';
import { render } from '@testing-library/react';

import InputBase from './input-base';

describe('InputBase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Theme>
        <InputBase />
      </Theme>
    );
    expect(baseElement).toBeTruthy();
  });
});
