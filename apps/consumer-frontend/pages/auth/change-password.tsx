import { Menu } from "..";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
} from '@chakra-ui/react'
import * as yup from "yup";
import { Input } from "@realiza/frontend/shared/ui-form";

type FormData = {
  name: string;
};

const schema = yup.object({
  name: yup.string().required().min(4),
}).required();

export function ChangePassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, touchedFields },
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
          <Input
            id='name'
            placeholder='name'
            configs={{
              label: 'Nome',
              isInvalid: touchedFields.name && Boolean(errors.name),
              error: touchedFields.name && errors.name?.message
            }}
            register={() => register('name')}
          />

        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;

