import { CircularProgress, Fade, Flex, Icon, Progress } from '@chakra-ui/react';
import { useAuthConfirmEmailByToken } from '@realiza/frontend/auth/data';
import { WrapperAuth, WrapperScreen } from '@realiza/frontend/auth/feature';
import { Menu } from '@realiza/frontend/shared/ui';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { BsShieldCheck, BsShieldLock, BsShieldX } from 'react-icons/bs';

const ConfirmeEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const { confirmEmailByToken, isLoading, error, data } =
    useAuthConfirmEmailByToken();
  const [isValidToken, setIsValidToken] = useState(false);

  const getError = useCallback(async () => {
    const response = await data;

    setIsValidToken(!response?.error || error instanceof Error);
  }, [data, error]);

  useEffect(() => {
    getError();
  }, [getError]);

  useEffect(() => {
    if (token === 'false' || !token) return;
    if (typeof token !== 'string') return;

    confirmEmailByToken(token);
  }, [confirmEmailByToken, token]);

  const getTitle = () => {
    if (token === 'false') return 'Verifique o seu e-mail';
    else if (isValidToken && !isLoading) return 'E-mail Confirmado!';
    else if (!isValidToken && !isLoading) return 'Token invalido';
    return '';
  };

  const getDescribe = () => {
    if (token === 'false')
      return 'Para acessar nossa plataforma é preciso confirmar o seu e-mail.';
    else if (isValidToken && !isLoading)
      return 'Confirmado com sucesso, a plataforma está disponível para uso.';
    else if (!isValidToken && !isLoading) return 'Token invalido';
    return '';
  };

  return (
    <>
      <Menu />
      {isLoading && <Progress size='xs' isIndeterminate />}
      <WrapperScreen>
        <WrapperAuth
          title={isLoading ? '' : getTitle()}
          describe={isLoading ? '' : getDescribe()}
        >
          {isLoading ? (
            <Flex
              align={'center'}
              alignItems={'center'}
              justifyContent={'center'}
              pb={8}
            >
              <Fade in={isLoading && token !== 'false'}>
                <CircularProgress isIndeterminate color='twitter.500' />
              </Fade>
            </Flex>
          ) : (
            <Flex
              align={'center'}
              alignItems={'center'}
              justifyContent={'center'}
              pb={8}
            >
              <Fade in={isValidToken && token !== 'false'}>
                <Icon
                  as={BsShieldCheck}
                  w={10}
                  h={10}
                  color='green.500'
                  ml={'-2rem'}
                />
              </Fade>
              <Fade in={!isValidToken && token !== 'false'}>
                <Icon
                  as={BsShieldX}
                  w={10}
                  h={10}
                  color='red.500'
                  ml={'-2rem'}
                />
              </Fade>
              <Fade in={token === 'false'}>
                <Icon
                  as={BsShieldLock}
                  w={10}
                  h={10}
                  color='twitter.300'
                  ml={'-2rem'}
                />
              </Fade>
            </Flex>
          )}
        </WrapperAuth>
      </WrapperScreen>
    </>
  );
};

export default ConfirmeEmail;
