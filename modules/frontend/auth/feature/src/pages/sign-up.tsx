import {
  Button,
  Divider,
  Flex,
  HStack,
  LinkBox,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CreateUserDto } from '@realiza/api/user';
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

import { WrapperAuth } from '../components/WrapperAuth/wrapperAuth';
import WrapperScreen from '../components/WrapperScreen/WrapperScreen';

const userForm = defaultUserForm<CreateUserDto>();

const formConfig: FormConfig<CreateUserDto> = {
  name: userForm.name('name'),
  email: userForm.email('email'),
  password: userForm.password('password'),
  passwordConfirmation: userForm.passwordConfirmation('passwordConfirmation'),
};
interface SignUpProps {
  submitHandlerOnValid?: SubmitHandler<CreateUserDto>;
  SubmitErrorHandlerOnInvalid?: SubmitErrorHandler<CreateUserDto>;
  title: string;
  describe: string;
  isLoading: boolean;
}

export function SignUp({
  title,
  describe,
  submitHandlerOnValid = onSubmitDevTest,
  SubmitErrorHandlerOnInvalid,
  isLoading,
}: SignUpProps) {
  const form = useForm<CreateUserDto>(getUseFormConfig(formConfig));
  const inputs = useGetInputs<CreateUserDto>(form, formConfig);
  const { handleSubmit, formState } = form;

  return (
    <WrapperScreen>
      <WrapperAuth
        title={title}
        describe={describe}
        onSubmit={handleSubmit(
          submitHandlerOnValid,
          SubmitErrorHandlerOnInvalid
        )}
        subDescribe={
          <Flex justifyContent={'center'} align={'center'}>
            <Text color={'gray.500'}>Já possui um conta?</Text>
            <LinkBox ml={1} as={NextLink} href={'/auth/sign-in'}>
              <Button tabIndex={-1} color='twitter.300' variant='unstyled'>
                Entrar
              </Button>
            </LinkBox>
          </Flex>
        }
      >
        <Input {...inputs.name()} isDisabled={isLoading} />
        <Input {...inputs.email()} isDisabled={isLoading} />
        <Flex>
          <Password {...inputs.password()} isDisabled={isLoading} />
          <Password {...inputs.passwordConfirmation()} isDisabled={isLoading} />
        </Flex>

        <Button
          mt={4}
          colorScheme='twitter'
          isLoading={formState.isSubmitting}
          type='submit'
        >
          Cadastrar
        </Button>
        <Stack spacing='6'>
          <HStack>
            <Divider />
            <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
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
