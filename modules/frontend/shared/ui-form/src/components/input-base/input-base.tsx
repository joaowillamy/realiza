import { FormControlProps } from '@chakra-ui/react';
import React from 'react';
import * as S from './styled'

export interface InputBaseProps extends FormControlProps {
  children?: React.ReactNode;
  label?: string;
  error?: string;
  id?: string;
}

export function InputBase({children, id, label, error, ...rest}: InputBaseProps) {
  const formattedError = id && label? error?.replace(id, label) : error

  return (
    <S.Wrapper {...rest}>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      {children}
      {error && <S.Error>{formattedError}</S.Error>}
    </S.Wrapper>
  );
}

export default InputBase;
