import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Divider, Flex, HStack, LinkBox, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link"

import { Input, Password } from "@realiza/frontend/shared/ui-form";
import { defaultUserForm, FormConfig, getUseFormConfig, onSubmitDevTest, useGetInputs } from "@realiza/frontend/shared/form";

import {WrapperAuth} from '../components/WrapperAuth/wrapperAuth'
import WrapperScreen from '../components/WrapperScreen/WrapperScreen';
import { OAuthButtonGroup } from '@realiza/frontend/shared/ui';
import { CreateUserDto } from '@realiza/api/user';

const userForm = defaultUserForm<CreateUserDto>()

const formConfig: FormConfig<CreateUserDto> = {
  name: userForm.name("name"),
  email: userForm.email("email"),
  password: userForm.password("password"),
  passwordConfirmation: userForm.passwordConfirmation("passwordConfirmation"),
}
interface SignUpProps {
  submitHandlerOnValid?: SubmitHandler<CreateUserDto>;
  SubmitErrorHandlerOnInvalid?: SubmitErrorHandler<CreateUserDto>;
  title: string;
  describe: string;
}

export function SignUp({ title, describe, submitHandlerOnValid = onSubmitDevTest, SubmitErrorHandlerOnInvalid }: SignUpProps) {
  const form = useForm<CreateUserDto>(getUseFormConfig(formConfig))
  const inputs = useGetInputs<CreateUserDto>(form, formConfig)
  const { handleSubmit, formState } = form;

  return (
    <WrapperScreen>
      <WrapperAuth
        title={title}
        describe={describe}
        onSubmit={handleSubmit(submitHandlerOnValid, SubmitErrorHandlerOnInvalid)}
        subDescribe={
          <Flex justifyContent={'center'} align={'center'}>
            <Text color={'gray.500'}>Já possui um conta?</Text>
            <LinkBox ml={1} as={NextLink} href={"/auth/sign-in"}>
              <Button tabIndex={-1} color='twitter.300' variant="unstyled">
                Entrar
              </Button>
            </LinkBox>
          </Flex>
        }
      >
        <Input {...inputs.name()} />
        <Input {...inputs.email()} />
        <Flex>
          <Password {...inputs.password()} />
          <Password {...inputs.passwordConfirmation()} />
        </Flex>

        <Button mt={4} colorScheme='twitter' isLoading={formState.isSubmitting} type='submit'>
          Cadastrar
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

export default SignUp;

