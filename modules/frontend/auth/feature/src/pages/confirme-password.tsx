import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Flex, LinkBox, Text } from "@chakra-ui/react";
import NextLink from "next/link"

import { Password } from "@realiza/frontend/shared/ui-form";
import { defaultUserForm, FormConfig, getUseFormConfig, onSubmitDevTest, useGetInputs } from "@realiza/frontend/shared/form";

import {WrapperAuth} from '../components/WrapperAuth/wrapperAuth'
import WrapperScreen from '../components/WrapperScreen/WrapperScreen';

interface Form {
  password: string;
  passwordConfirmation: string;
};

const userForm = defaultUserForm<Form>()

const formConfig: FormConfig<Form> = {
  password: userForm.password("password"),
  passwordConfirmation: userForm.passwordConfirmation("passwordConfirmation"),
}
interface ConfirmePasswordProps {
  submitHandlerOnValid?: SubmitHandler<Form>;
  SubmitErrorHandlerOnInvalid?: SubmitErrorHandler<Form>;
  title: string;
  describe: string;
}

export function ConfirmePassword({ title, describe, submitHandlerOnValid = onSubmitDevTest, SubmitErrorHandlerOnInvalid }: ConfirmePasswordProps) {
  const form = useForm<Form>(getUseFormConfig(formConfig))
  const inputs = useGetInputs<Form>(form, formConfig)
  const { handleSubmit, formState } = form;

  return (
    <WrapperScreen>
      <WrapperAuth
        title={title}
        describe={describe}
        onSubmit={handleSubmit(submitHandlerOnValid, SubmitErrorHandlerOnInvalid)}
        subDescribe={<Text color={'gray.500'}>Enviaremos um e-mail para sua conta</Text>}
      >
        <Password {...inputs.password()} />
        <Password {...inputs.passwordConfirmation()} />

        <Button mt={4} colorScheme='twitter' isLoading={formState.isSubmitting} type='submit'>
          Enviar
        </Button>
      </WrapperAuth>
    </WrapperScreen>
  );
}

export default ConfirmePassword;

