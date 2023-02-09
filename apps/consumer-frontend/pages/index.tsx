import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  LinkBox,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Footer, Menu, QuoteWrapper } from '@realiza/frontend/shared/ui';
import NextLink from 'next/link';

export function Index() {
  return (
    <>
      <Menu />
      <Box as='section' bg='gray.100'>
        <Container py={{ base: '16', md: '24' }}>
          <Stack spacing={{ base: '8', md: '10' }}>
            <Stack spacing={{ base: '4', md: '5' }} align='center'>
              <Heading size={{ base: 'sm', md: 'md' }}>
                Preparado para crescer?
              </Heading>
              <Text color='muted' maxW='2xl' textAlign='center' fontSize='xl'>
                Venha conhecer essa nova plataforma incrível, não vai se
                arrepender dos beneficios.
              </Text>
            </Stack>
            <Stack
              spacing='3'
              direction={{ base: 'column', sm: 'row' }}
              justify='center'
            >
              <Button variant='outline' size='lg'>
                Saíba mais
              </Button>
              <Button variant='solid' colorScheme={'twitter'} size='lg'>
                Cadastre-se, é Grátis!
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <QuoteWrapper />
      <Footer />
    </>
  );
}

export default Index;
