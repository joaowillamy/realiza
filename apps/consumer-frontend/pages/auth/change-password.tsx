import { Menu } from "..";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
} from '@chakra-ui/react'
import * as yup from "yup";
import { Input } from "@realiza/frontend/shared/ui-form";
import { FormConfig } from "@realiza/frontend/shared/form";

type FormData = {
  name: string;
};

const formConfig: FormConfig<FormData> = {
  name: {
    validate: yup.string().required().min(4),
    getInputConfig: ({ formState, register }) => ({
      id:'name',
      placeholder:'name',
      configs: {
        label: 'Nome',
        isInvalid: formState.touchedFields.name && Boolean(formState.errors.name),
        error: formState.touchedFields.name && formState.errors.name?.message
      },
      register: () => register('name'),
    })
  }
}

const schema = yup.object({
  name: formConfig.name.validate,
}).required();

export function ChangePassword() {
  const {
    handleSubmit,
    register,
    formState,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve && resolve(values)
      }, 3000)
    })
  }
  return (
    <div>

      <Menu />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...formConfig.name.getInputConfig({formState, register})} />

        <Button mt={4} colorScheme='teal' isLoading={formState.isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;

