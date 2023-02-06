import { Box, Flex, Heading, LinkBox, Stack } from '@chakra-ui/react';
import { QuoteWrapper } from '@realiza/frontend/shared/ui';
import { BaseSyntheticEvent } from 'react';
import NextLink from "next/link"

import * as S from './styled'

export interface WrapperAuthProps  {
  children?: React.ReactNode;
  title: string;
  describe: string;
  subDescribe: React.ReactNode;
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

export const WrapperAuth = ({ children, title, describe, onSubmit, subDescribe }: WrapperAuthProps) => {
  return (
    <Flex align={'center'} justifyContent={'center'}>
      <S.Wrapper>
        <Box minW={{ base: "90%", md: "468px" }} maxW={{ base: "90%", md: "468px" }} shadow={'sm'}>
          <form noValidate onSubmit={onSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderWidth='1px' borderRadius='2xl'
            >
              <Flex align={'center'} flexDir="column" justifyContent="center" alignItems="center">
                <LinkBox ml={1} as={NextLink} href={"/"}>
                  <Heading mb={2} color="twitter.600" >{title}</Heading>
                </LinkBox>
                <Heading size={'sm'} mb={2}>{describe}</Heading>
                {subDescribe}
              </Flex>
              {children}
            </Stack>
          </form>
        </Box>
      </S.Wrapper>
      <QuoteWrapper />
    </Flex>
  );
}

export default WrapperAuth;
