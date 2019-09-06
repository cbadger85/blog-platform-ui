import { useContext, useEffect, useMemo } from 'react';
import { FormContext, FormState } from '../state';
import { RequiredFunction } from '../types';

export const useRegisterField = (
  name: string,
  defaultValue: string,
  required: boolean | RequiredFunction | undefined,
  validate: ((input: string, formState: FormState) => boolean) | undefined
) => {
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;

  const isValid = useMemo(() => {
    const isEmpty = () => {
      if (!required || !formState) {
        return false;
      }

      if (typeof required === 'function') {
        return required(formState);
      }

      return true;
    };

    const inputIsValid =
      (formState && validate && validate(defaultValue, formState)) || !required;
    if (isEmpty()) {
      return false;
    }

    if (validate && !inputIsValid) {
      return false;
    }

    return true;
  }, [defaultValue, formState, required, validate]);

  useEffect(() => {
    registerField({
      name,
      value: defaultValue,
      isValid: isValid,
    });
  }, [defaultValue, isValid, registerField, name]);

  return { formState, updateField };
};
