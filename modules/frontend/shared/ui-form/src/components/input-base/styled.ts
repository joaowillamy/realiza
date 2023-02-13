import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BaseTheme } from '@realiza/frontend/shared/ui';

export const Wrapper = styled(FormControl)`
  padding: ${({ theme }: BaseTheme) => theme?.space[2]};
`;

export const Label = styled(FormLabel)`
  font-weight: 400;
`;

export const Error = styled(FormErrorMessage)`
  color: ${({ theme }: BaseTheme) => theme?.colors.red[500]};
`;
