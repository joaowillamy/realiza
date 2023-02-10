import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
/* eslint-disable-next-line */
export interface MenuProps {}

const butons = {
  login: 'login',
  create: 'create',
};

type Buttons = keyof typeof butons;

export function Menu(props: MenuProps) {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [isLoading, setIsLoading] = React.useState<Buttons | null>(null);

  const onClick = (button: Buttons) => {
    setIsLoading(button);
  };

  const isLoadingButton = (button: Buttons): boolean => {
    return isLoading === button;
  };

  return (
    <Flex backgroundColor={'gray.50'} flexDirection={'column'}>
      <Box p={5} mb={2} backgroundColor={'white'} borderWidth="1px" borderBottomRadius="2xl" shadow={'md'}>
        <Container maxW="7xl">
          <Flex align="center" justifyContent={'space-between'}>
            <Heading color="twitter.600">Realiza</Heading>
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup ml={10} variant="link" spacing="8">
                  {['Home', 'Blog'].map((item) => (
                    <Button key={item}>{item}</Button>
                  ))}
                </ButtonGroup>

                <HStack spacing="3">
                  <LinkBox as={NextLink} href={'/auth/sign-up'}>
                    <Button
                      tabIndex={-1}
                      mr={4}
                      color="twitter.400"
                      isLoading={isLoadingButton('create')}
                      onClick={() => onClick('create')}
                      variant="unstyled"
                    >
                      Cadastre-se
                    </Button>
                  </LinkBox>
                  <LinkBox as={NextLink} href={'/auth/sign-in'}>
                    <Button
                      tabIndex={-1}
                      colorScheme="twitter"
                      isLoading={isLoadingButton('login')}
                      onClick={() => onClick('login')}
                    >
                      Entrar
                    </Button>
                  </LinkBox>
                </HStack>
              </Flex>
            ) : (
              <IconButton variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" />
            )}
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}

export default Menu;
