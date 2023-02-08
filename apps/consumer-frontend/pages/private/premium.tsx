import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Skeleton,
  SkeletonCircle,
  Fade,
} from '@chakra-ui/react';

import { useAuthLogout, useMe } from '@realiza/frontend/auth/data';
import React from 'react';

const PremiumPassword = ({ data }) => {
  const {isLoading, logout } = useAuthLogout()
  const { me, meRefetch, isLoading: isLoadingMe } = useMe()
  const colorModeValue = useColorModeValue('white', 'gray.800')
  const black = useColorModeValue('#151f21', 'gray.900')

  React.useEffect(() => {
    meRefetch()
  }, [meRefetch])

  const onClickLogout = () => {
    logout()
  }

  console.log({isLoading});

  // <Skeleton height='20px' fadeDuration={1} m={5} isLoaded={!isLoadingMe}>


  return  <Center py={6}>
  <Box
    maxW={'270px'}
    w={'full'}
    bg={colorModeValue}
    boxShadow={'2xl'}
    rounded={'md'}
    overflow={'hidden'}>
    <Image
      h={'120px'}
      w={'full'}
      src={
        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      }
      objectFit={'cover'}
    />
      <Flex justify={'center'} mt={-12} >
        <Fade in={isLoadingMe} unmountOnExit={true}>
          <SkeletonCircle  size='20' ml={'24'} p={0} isLoaded={!isLoadingMe}></SkeletonCircle>
        </Fade>
        <Fade in={!isLoadingMe} delay={0.5}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            css={{
              border: '2px solid white',
            }}
          />
        </Fade>
      </Flex>

    <Box p={6}>

      <Fade in={isLoadingMe} unmountOnExit={true}>
        {isLoadingMe && <Skeleton height={'25px'} m={1} isLoaded={!isLoadingMe}/>}
        {isLoadingMe && <Skeleton height={'15px'} m={1} isLoaded={!isLoadingMe}/>}
      </Fade>

      <Fade in={!isLoadingMe} delay={0.4}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {me?.name}
          </Heading>
          <Text color={'gray.500'}>{me?.email}</Text>
        </Stack>
      </Fade>


      <Stack direction={'row'} justify={'center'} spacing={6}>
        <Stack spacing={0} align={'center'}>
          <Text fontWeight={600}>23k</Text>
          <Text fontSize={'sm'} color={'gray.500'}>
            Followers
          </Text>
        </Stack>
        <Stack spacing={0} align={'center'}>
          <Text fontWeight={600}>23k</Text>
          <Text fontSize={'sm'} color={'gray.500'}>
            Followers
          </Text>
        </Stack>
      </Stack>

      <Button
        w={'full'}
        mt={8}
        bg={black}
        color={'white'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        isLoading={isLoading}
        onClick={onClickLogout}
        >
        Sair
      </Button>
    </Box>
  </Box>
</Center>
}

export default PremiumPassword

