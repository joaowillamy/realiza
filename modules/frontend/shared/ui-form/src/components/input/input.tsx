import { InputProps as InputPropsChakra } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { InputBase, InputBaseProps } from '../input-base/input-base';
import * as S from './styled';

export interface InputProps extends InputPropsChakra {
  readonly configs?: InputBaseProps;
  readonly register: () => UseFormRegisterReturn;
}

export function Input({ id, configs, register, ...inputProps }: InputProps) {
  return (
    <InputBase id={id} {...configs}>
      <S.Input
        {...inputProps}
        {...register()}
        textIndent={configs?.leftElement ? '20px' : ''}
      />
    </InputBase>
  );
}

export default Input;
