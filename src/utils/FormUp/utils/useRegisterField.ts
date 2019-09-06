import { useContext, useEffect, useMemo } from 'react';
import { FormContext, FormState } from '../state';
import { RequiredFunction } from '../types';

export const useRegisterField = (
  id: string,
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
    // const isEmpty = required && !defaultValue.trim();
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
      id,
      value: defaultValue,
      isValid: isValid,
    });
  }, [id, defaultValue, isValid, registerField]);

  return { formState, updateField };
};
