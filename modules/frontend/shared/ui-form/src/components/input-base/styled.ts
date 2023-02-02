import styled from '@emotion/styled';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

export const Wrapper = styled(FormControl)`
  padding: ${({theme})=> theme.space[2]};
`

export const Label = styled(FormLabel)`
  font-weight: 400;
`;

export const Error = styled(FormErrorMessage)`
  color: ${({theme})=> theme.colors.red[500]};
`
