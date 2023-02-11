import { Button, Checkbox, Divider, Flex, HStack, LinkBox, Stack, Text } from '@chakra-ui/react';
import { SigninDto } from '@realiza/frontend/auth/data';
import {
  defaultUserForm,
  FormConfig,
  getUseFormConfig,
  onSubmitDevTest,
  useGetInputs,
} from '@realiza/frontend/shared/form';
import { OAuthButtonGroup } from '@realiza/frontend/shared/ui';
import { Input, Password } from '@realiza/frontend/shared/ui-form';
import NextLink from 'next/link';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { WrapperAuth } from '../components/WrapperAuth/WrapperAuth';
import WrapperScreen from '../components/WrapperScreen/WrapperScreen';

const userForm = defaultUserForm<SigninDto>();

const formConfig: FormConfig<SigninDto> = {
  email: userForm.email('email'),
  password: { ...userForm.password('password'), validate: yup.string() },
};
interface SignInProps {
  submitHandlerOnValid?: SubmitHandler<SigninDto>;
  SubmitErrorHandlerOnInvalid?: SubmitErrorHandler<SigninDto>;
  title: string;
  describe: string;
}

export function SignIn({
  title,
  describe,
  submitHandlerOnValid = onSubmitDevTest,
  SubmitErrorHandlerOnInvalid,
}: SignInProps) {
  const form = useForm<SigninDto>(getUseFormConfig(formConfig));
  const inputs = useGetInputs<SigninDto>(form, formConfig);
  const { handleSubmit, formState } = form;

  return (
    <WrapperScreen>
      <WrapperAuth
        title={title}
        describe={describe}
        onSubmit={handleSubmit(submitHandlerOnValid, SubmitErrorHandlerOnInvalid)}
        subDescribe={
          <Flex justifyContent={'center'} align={'center'}>
            <Text color={'gray.500'}>Ainda não tem conta?</Text>
            <LinkBox as={NextLink} href={'/auth/sign-up'}>
              <Button tabIndex={-1} ml={1} variant="unstyled" color={'twitter.300'}>
                Cadastre-se!
              </Button>
            </LinkBox>
          </Flex>
        }
      >
        <Input {...inputs.email()} />
        <Password {...inputs.password()} />
        <Flex justifyContent={'space-between'} px={1}>
          <Checkbox size="md" colorScheme={'twitter'} color={'gray.500'} defaultChecked>
            Continuar conectado
          </Checkbox>
          <LinkBox as={NextLink} href={'/auth/change-password'}>
            <Button tabIndex={-1} colorScheme="twitter" variant="unstyled" color={'twitter.400'}>
              Esqueceu a senha?
            </Button>
          </LinkBox>
        </Flex>
        <Button mt={4} colorScheme="twitter" isLoading={formState.isSubmitting} type="submit">
          Entrar
        </Button>
        <Stack spacing="6">
          <HStack>
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap" color="muted">
              Ou
            </Text>
            <Divider />
          </HStack>
          <OAuthButtonGroup />
        </Stack>
      </WrapperAuth>
    </WrapperScreen>
  );
}

export default SignIn;
