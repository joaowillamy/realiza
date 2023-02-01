import styled from '@emotion/styled';
import { Button as ChakraButton } from "@chakra-ui/react"

/* eslint-disable-next-line */
export interface ButtonProps {}

const StyledButton = styled(ChakraButton)`
  font-weight: 400;
`;

export function Button(props: ButtonProps) {
  return (
    <StyledButton>
      <h1>Welcome to Button!</h1>
    </StyledButton>
  );
}

export default Button;
