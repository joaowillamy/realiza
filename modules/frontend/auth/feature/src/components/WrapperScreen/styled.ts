import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BaseTheme } from '@realiza/frontend/shared/ui';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  width: 100wh;
  height: 100vh;
  background-color: ${({ theme }: BaseTheme) => theme.colors.gray[50]};
  justify-content: center;
  align-items: center;
`;
