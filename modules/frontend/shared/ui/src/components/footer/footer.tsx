import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <Box
      p={5}
      mb={2}
      backgroundColor={'gray.100'}
      borderWidth='1px'
      borderTopRadius='2xl'
      shadow={''}
    >
      <Container mt={10} maxW='7xl'>
        <Stack as={'footer'} spacing={{ base: '4', md: '5' }}>
          <Stack justify='space-between' direction='row' align='center'>
            <Heading color='twitter.600'>Realiza</Heading>
            <ButtonGroup variant='ghost'>
              <IconButton
                as='a'
                href='#'
                aria-label='LinkedIn'
                icon={<FaLinkedin fontSize='1.25rem' />}
              />
              <IconButton
                as='a'
                href='#'
                aria-label='GitHub'
                icon={<FaGithub fontSize='1.25rem' />}
              />
              <IconButton
                as='a'
                href='#'
                aria-label='Twitter'
                icon={<FaTwitter fontSize='1.25rem' />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize='sm' color='subtle'>
            &copy; {new Date().getFullYear()} Realiza, Todos os direitos
            reservados.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
