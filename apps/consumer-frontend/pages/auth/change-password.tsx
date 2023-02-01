import { Menu } from "..";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text
} from '@chakra-ui/react'
import * as yup from "yup";

const Error = ({children}) => <Text>{children}</Text>

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
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema)
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
      ChangePassword
      <Menu />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor='name'>First name</FormLabel>
          <Input
            id='name'
            placeholder='name'
            {...register('name')}
          />
          <FormErrorMessage>
            {errors.name ? <Error>{errors.name.message}</Error> : null}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;

