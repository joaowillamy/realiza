import { InputBaseProps, InputBase } from '../input-base/input-base';
import { InputProps as InputPropsChakra } from '@chakra-ui/react';

import * as S from './styled'
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps extends InputPropsChakra  {
  configs?: InputBaseProps;
  register: () => UseFormRegisterReturn;
}

export function Input({id, configs, register, ...inputProps  }: InputProps) {

  return (
    <InputBase id={id} {...configs}>
      <S.Input
      {...inputProps}
      {...register()}
      />
    </InputBase>

  );
}

export default Input;
