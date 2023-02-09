import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  width: 100wh;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  justify-content: center;
  align-items: center;
`;
