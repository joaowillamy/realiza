import { Button, Flex, LinkBox, Text } from '@chakra-ui/react';
import {
  defaultUserForm,
  FormConfig,
  getUseFormConfig,
  onSubmitDevTest,
  useGetInputs,
} from '@realiza/frontend/shared/form';
import { Input } from '@realiza/frontend/shared/ui-form';
import NextLink from 'next/link';
import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { WrapperAuth } from '../components/WrapperAuth/wrapperAuth';
import WrapperScreen from '../components/WrapperScreen/WrapperScreen';

interface Form {
  email: string;
}

const userForm = defaultUserForm<Form>();

const formConfig: FormConfig<Form> = {
  email: userForm.email('email'),
};
interface ChangePasswordProps {
  submitHandlerOnValid?: SubmitHandler<Form>;
  SubmitErrorHandlerOnInvalid?: SubmitErrorHandler<Form>;
  title: string;
  describe: string;
}

export function ChangePassword({
  title,
  describe,
  submitHandlerOnValid = onSubmitDevTest,
  SubmitErrorHandlerOnInvalid,
}: ChangePasswordProps) {
  const form = useForm<Form>(getUseFormConfig(formConfig));
  const inputs = useGetInputs<Form>(form, formConfig);
  const { handleSubmit, formState } = form;

  return (
    <WrapperScreen>
      <WrapperAuth
        title={title}
        describe={describe}
        onSubmit={handleSubmit(submitHandlerOnValid, SubmitErrorHandlerOnInvalid)}
        subDescribe={<Text color={'gray.500'}>Enviaremos um e-mail para sua conta</Text>}
      >
        <Input {...inputs.email()} />

        <Button mt={4} colorScheme="twitter" isLoading={formState.isSubmitting} type="submit">
          Enviar
        </Button>
        <Flex mt={2} flexDirection={'column'} align={'center'}>
          <LinkBox as={NextLink} href={'/auth/sign-in'}>
            <Button tabIndex={-1} color="twitter.400" variant="unstyled">
              Voltar
            </Button>
          </LinkBox>
        </Flex>
      </WrapperAuth>
    </WrapperScreen>
  );
}

export default ChangePassword;
