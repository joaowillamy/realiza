import { FormConfigValue } from "../hooks/useInput";
import * as yup from "yup";
import { TiMail } from "react-icons/ti";

import { Icon } from '@chakra-ui/react'

type DefaultUserForm =  'name' | 'email' | 'password';

type InputConfig = <Form>() => {
  [x in DefaultUserForm]: (key: keyof Form) =>  FormConfigValue<any>
}

export const defaultUserForm: InputConfig = ()=> ({
  name: (key) => ({
    validate: yup.string().required().min(4),
    getInputConfig: ({ formState, register }) => ({
      id: key as string,
      placeholder:'name',
      configs: {
        label: 'Nome:',
        isInvalid: formState.touchedFields[key] && Boolean(formState.errors[key]),
        error: formState.touchedFields[key] && formState.errors[key]?.message as string
      },
      register: () => register(key as string),
    })
  }),
  email: (key) => ({
    validate: yup.string().required().email(),
    getInputConfig: ({ formState, register }) => ({
      id: key as string,
      placeholder:'willamy@gmail.com',
      type: 'email',
      configs: {
        label: 'E-mail:',
        isInvalid: formState.touchedFields[key] && Boolean(formState.errors[key]),
        error: formState.touchedFields[key] && formState.errors[key]?.message as string,
        leftElement: <Icon as={TiMail} color="gray.500" />
      },
      register: () => register(key as string),
    })
  }),
  password: (key) => ({
    validate: yup
      .string()
      .required()
      .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo")
      .min(6),
    getInputConfig: ({ formState, register }) => ({
      id: key as string,
      placeholder:'******',
      type: 'password',
      configs: {
        label: 'Senha:',
        isInvalid: formState.touchedFields[key] && Boolean(formState.errors[key]),
        error: formState.touchedFields[key] && formState.errors[key]?.message as string
      },
      register: () => register(key as string),
    })
  }),
})
