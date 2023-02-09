import { render } from '@testing-library/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import Password from './password';

describe('Password', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Password
        register={() => ({
          name: 'name',
          onChange: jest.fn(),
          onBlur: jest.fn(),
          ref: jest.fn(),
        })}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
