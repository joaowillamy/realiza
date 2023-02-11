import { yupResolver } from '@hookform/resolvers/yup';
import { InputProps } from '@realiza/frontend/shared/ui-form';
import React from 'react';
import { FormState, Resolver, UseFormRegister, ValidationMode } from 'react-hook-form';
import * as yup from 'yup';

export type InputConfig<FormData> = {
  formState: FormState<FormData>;
  register: UseFormRegister<FormData>;
};

export type FormConfigValue<FormData> = {
  readonly validate: yup.StringSchema;
  readonly getInputConfig: (props: InputConfig<FormData>) => InputProps;
};

export type FormConfig<FormData> = {
  readonly [key in keyof FormData]: FormConfigValue<FormData>;
};

export type GetInputs<FormData> = {
  readonly [key in keyof FormData]: () => InputProps;
};

export function useGetInputs<FormData>(
  inputsConfig: InputConfig<FormData>,
  formConfig: FormConfig<FormData>
): GetInputs<FormData> {
  const inputs: GetInputs<FormData> = React.useMemo(() => {
    return Object.entries(formConfig).reduce(
      (acc, [functionName, config]) => ({
        ...acc,
        [functionName]: (): InputProps => (config as FormConfigValue<FormData>).getInputConfig(inputsConfig),
      }),
      {} as GetInputs<FormData>
    );
  }, [formConfig, inputsConfig]);

  return inputs;
}

export const getUseFormConfig = <FormData>(
  formConfig: FormConfig<FormData>
): {
  resolver: Resolver<FormData, any>;
  mode: keyof ValidationMode;
} => {
  const validators = Object.entries(formConfig).reduce(
    (acc, [functionName, config]) => ({
      ...acc,
      [functionName]: (config as FormConfigValue<FormData>).validate,
    }),
    {}
  );

  const schema = yup.object(validators).required();

  return {
    resolver: yupResolver(schema),
    mode: 'onChange',
  };
};

export function onSubmitDevTest(values: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      resolve && resolve(values);
    }, 3000);
  });
}
