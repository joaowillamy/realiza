import { InputProps } from "@realiza/frontend/shared/ui-form";
import { FormState, UseFormRegister } from "react-hook-form";
import * as yup from "yup";

export type InputConfig<FormData> = { formState: FormState<FormData>, register: UseFormRegister<FormData> }

export type FormConfig<FormData> = {
  [key in keyof FormData]: {
    validate: yup.StringSchema;
    getInputConfig: (props: InputConfig<FormData>) => InputProps;
  };
};
