import { useContext, useEffect, useMemo } from 'react';
import { FormContext, FormState } from '../state';

export const useRegisterField = (
  id: string,
  defaultValue: string,
  required: boolean | undefined,
  validate: ((input: string, formState: FormState) => boolean) | undefined
) => {
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;

  const isValid = useMemo(() => {
    const isEmpty = required && !defaultValue.trim();
    const inputIsValid =
      (formState && validate && validate(defaultValue, formState)) || !required;
    if (required && isEmpty) {
      return false;
    }

    if (validate && !inputIsValid) {
      return false;
    }

    return true;
  }, [defaultValue, formState, required, validate]);

  useEffect(() => {
    registerField({
      id,
      value: defaultValue,
      isValid: isValid,
    });
  }, [id, defaultValue, isValid, registerField]);

  return { formState, updateField };
};
