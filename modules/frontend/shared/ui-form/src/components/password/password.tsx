import { Button, InputProps as InputPropsChakra } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TiLockClosedOutline, TiLockOpenOutline } from 'react-icons/ti';

import { InputBase, InputBaseProps } from '../input-base/input-base';
import * as S from './styled';

export interface PasswordProps extends InputPropsChakra {
  readonly configs?: InputBaseProps;
  readonly register: () => UseFormRegisterReturn;
}

export function Password({ id, configs, register, ...passwordProps }: PasswordProps) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputBase
      id={id}
      {...configs}
      leftElement={<Icon as={TiLockClosedOutline} color="gray.500" />}
      rightElement={
        <Button tabIndex={-1} h="1.75rem" size="sm" color="gray.500" variant="ghost" onClick={handleClick}>
          {show ? <Icon as={TiLockClosedOutline} /> : <Icon as={TiLockOpenOutline} />}
        </Button>
      }
    >
      <S.Password {...passwordProps} {...register()} type={show ? 'text' : 'password'} />
    </InputBase>
  );
}

export default Password;
