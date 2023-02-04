import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup";

import { Input, Password } from "@realiza/frontend/shared/ui-form";
import { defaultUserForm, FormConfig, getUseFormConfig, onSubmitDevTest, useGetInputs } from "@realiza/frontend/shared/form";
import { Button } from "@chakra-ui/react";

import {WrapperAuth} from '../components/WrapperAuth/wrapperAuth'

interface Form {
  name: string;
  email: string;
  password: string;
};

const userForm = defaultUserForm<Form>()

const formConfig: FormConfig<Form> = {
  name: userForm.name("name"),
  email: userForm.email("email"),
  password: {...userForm.password("password"), validate: yup.string() },
}
interface ChangePasswordProps {
  submitHandlerOnValid?: SubmitHandler<Form>,
  SubmitErrorHandlerOnInvalid?: SubmitErrorHandler<Form>
}

export function ChangePassword({ submitHandlerOnValid = onSubmitDevTest, SubmitErrorHandlerOnInvalid }: ChangePasswordProps) {
  const form = useForm<Form>(getUseFormConfig(formConfig))
  const inputs = useGetInputs<Form>(form, formConfig)
  const { handleSubmit, formState } = form;

  return (
      <WrapperAuth title='Realiza' describe='Troque sua senha!' onSubmit={handleSubmit(submitHandlerOnValid, SubmitErrorHandlerOnInvalid)}>
        <Input {...inputs.name()} />
        <Input {...inputs.email()} />
        <Password {...inputs.password()} />

        <Button mt={4} colorScheme='twitter' isLoading={formState.isSubmitting} type='submit'>
          Enviar
        </Button>
      </WrapperAuth>
  );
}

export default ChangePassword;

