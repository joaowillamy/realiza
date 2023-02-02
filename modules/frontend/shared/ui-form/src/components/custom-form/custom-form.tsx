import { Input, InputProps, MergeWithAs } from '@chakra-ui/react'

export type CustomFormProps = MergeWithAs<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, InputProps, "input">

export function CustomForm(props: CustomFormProps) {
  return (
    <Input {...props} />
  );
}

export default CustomForm;
