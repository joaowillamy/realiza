import { Theme } from '@realiza/frontend/shared/ui';
import { render } from '@testing-library/react';

import Password from './password';

describe('Password', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Theme>
        <Password
          register={() => ({
            name: 'name',
            onChange: jest.fn(),
            onBlur: jest.fn(),
            ref: jest.fn(),
          })}
        />
      </Theme>
    );
    expect(baseElement).toBeTruthy();
  });
});
