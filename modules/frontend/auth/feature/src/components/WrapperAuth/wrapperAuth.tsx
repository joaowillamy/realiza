import { Box, Text, Heading, Stack, Center, Flex } from '@chakra-ui/react';
import { BaseSyntheticEvent } from 'react';
import * as S from './styled'

export interface WrapperAuthProps  {
  children?: React.ReactNode;
  title: string;
  describe: string;
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

export const WrapperAuth = ({ children, title, describe, onSubmit }: WrapperAuthProps) => {
  return (
    <S.Wrapper>
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Flex align={'center'} flexDir="column" justifyContent="center" alignItems="center">
          <Heading mb={2} color="twitter.600" >{title}</Heading>
          <Heading size={'sm'} mb={2}>{describe}</Heading>
        </Flex>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={onSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              {children}
            </Stack>
          </form>
        </Box>
      </Stack>
    </S.Wrapper>
  );
}

export default WrapperAuth;
