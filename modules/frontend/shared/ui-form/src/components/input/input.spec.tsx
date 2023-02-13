import { Theme } from '@realiza/frontend/shared/ui';
import { render } from '@testing-library/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import Input from './input';

describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Theme>
        <Input register={() => ({} as UseFormRegisterReturn<string>)} />
      </Theme>
    );
    expect(baseElement).toBeTruthy();
  });
});
