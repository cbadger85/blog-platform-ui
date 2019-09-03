import { useContext, useEffect, useMemo } from 'react';
import { FormContext, FormState } from '../state';
import { validateInput } from './validateInput';

export const useRegisterField = (
  id: string,
  defaultValue: string,
  required: boolean | undefined,
  validate: ((input: string, formState: FormState) => boolean) | undefined
) => {
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;

  const isValid = useMemo(
    () => validateInput(defaultValue, formState, required, validate),
    [defaultValue, formState, required, validate]
  );

  useEffect(() => {
    registerField({
      id,
      value: defaultValue,
      isValid: isValid,
    });
  }, [id, defaultValue, isValid, registerField]);

  return { formState, updateField };
};
