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
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import NextLink from "next/link"

/* eslint-disable-next-line */
export interface MenuProps {}

export function Menu(props: MenuProps) {
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  return (

    <Flex backgroundColor={'gray.50'} flexDirection={'column'}>
        <Box p={5}  mb={2} backgroundColor={'white'}  borderWidth='1px' borderBottomRadius='2xl' shadow={'md'}>
          <Container maxW='7xl' >
            <Flex  align="center" justifyContent={'space-between'}>
              <Heading color="twitter.600">Realiza</Heading>
              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  <ButtonGroup ml={10} variant="link" spacing="8">
                    {['Home', 'Blog'].map((item) => (
                      <Button key={item}>{item}</Button>
                    ))}
                  </ButtonGroup>

                  <HStack spacing="3">
                    <LinkBox as={NextLink} href={"/auth/sign-up"}>
                      <Button tabIndex={-1} mr={4} color='twitter.400' variant='unstyled'>Cadastre-se</Button>
                    </LinkBox>
                    <LinkBox as={NextLink} href={"/auth/sign-in"} >
                      <Button tabIndex={-1} colorScheme='twitter'>Entrar</Button>
                    </LinkBox>
                  </HStack>
                </Flex>
              ): (
                <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
              )}
            </Flex>

          </Container>
        </Box>
      </Flex>
  );
}

export default Menu;
