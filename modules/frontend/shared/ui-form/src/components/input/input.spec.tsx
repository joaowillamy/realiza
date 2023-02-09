import { render } from '@testing-library/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import Input from './input';

describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Input
        register={function (): UseFormRegisterReturn<string> {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
