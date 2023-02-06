import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup";
import { Button, Checkbox, Divider, Flex, HStack, Link, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link"

import { Input, Password } from "@realiza/frontend/shared/ui-form";
import { defaultUserForm, FormConfig, getUseFormConfig, onSubmitDevTest, useGetInputs } from "@realiza/frontend/shared/form";


import {WrapperAuth} from '../components/WrapperAuth/wrapperAuth'
import WrapperScreen from '../components/WrapperScreen/WrapperScreen';
import { OAuthButtonGroup } from '@realiza/frontend/shared/ui';

interface Form {
  email: string;
  password: string;
};

const userForm = defaultUserForm<Form>()

const formConfig: FormConfig<Form> = {
  email: userForm.email("email"),
  password: {...userForm.password("password"), validate: yup.string() },
}
interface SignInProps {
  submitHandlerOnValid?: SubmitHandler<Form>;
  SubmitErrorHandlerOnInvalid?: SubmitErrorHandler<Form>;
  title: string;
  describe: string;
}

export function SignIn({ title, describe, submitHandlerOnValid = onSubmitDevTest, SubmitErrorHandlerOnInvalid }: SignInProps) {
  const form = useForm<Form>(getUseFormConfig(formConfig))
  const inputs = useGetInputs<Form>(form, formConfig)
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
            <LinkBox as={NextLink} href={"/auth/sign-up"}>
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
          <Checkbox size='md' colorScheme={'twitter'} color={'gray.500'} defaultChecked>
            Continuar conectado
          </Checkbox>
          <LinkBox as={NextLink} href={"/auth/change-password"}>
            <Button tabIndex={-1} colorScheme='twitter' variant="unstyled" color={'twitter.400'}>
              Esqueceu a senha?
            </Button>
          </LinkBox>
        </Flex>
        <Button mt={4} colorScheme='twitter' isLoading={formState.isSubmitting} type='submit'>
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

