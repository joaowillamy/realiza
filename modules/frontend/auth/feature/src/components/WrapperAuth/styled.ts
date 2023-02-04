import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const Wrapper = styled(Flex)`
    flex-direction: column;
    width: 100wh;
    height: 100vh;
    background-color: ${({theme}) => theme.colors.gray[100]};
    justify-content: center;
    align-items: center;
`
