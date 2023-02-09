import { Button as ChakraButton } from '@chakra-ui/react';
import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ButtonProps {}

const StyledButton = styled(ChakraButton)`
  font-weight: 400;
`;

export function Button(props: ButtonProps) {
  return <StyledButton>Welcome to Button!</StyledButton>;
}

export default Button;
