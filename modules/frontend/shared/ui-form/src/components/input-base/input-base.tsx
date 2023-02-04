import { FormControlProps, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import * as S from './styled'

export interface InputBaseProps extends FormControlProps {
  readonly children?: React.ReactNode;
  readonly label?: string;
  readonly error?: string | boolean;
  readonly id?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

export function InputBase({children, id, label, error, rightElement, leftElement, ...rest}: InputBaseProps) {
  const formattedError = id && label && typeof error === 'string' ? error?.replace(id, label) : error

  return (
    <S.Wrapper {...rest}>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <InputGroup>
        {leftElement && (
          <InputLeftElement children={leftElement} />
        )}
        {children}
        {rightElement && (
          <InputRightElement  width='3.5rem' children={rightElement} />
        )}
      </InputGroup>
      {error && <S.Error>{formattedError}</S.Error>}
    </S.Wrapper>
  );
}

export default InputBase;
