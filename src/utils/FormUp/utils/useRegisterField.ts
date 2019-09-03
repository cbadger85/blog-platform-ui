import { FormContext } from '../state';
import { useContext, useCallback, useEffect } from 'react';
import { validateInput } from './validateInput';

export const useRegisterField = (
  id: string,
  defaultValue: string,
  required: boolean | undefined,
  validate: ((input: string) => boolean) | undefined
) => {
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;

  const validator = useCallback(
    () => validateInput(defaultValue, required, validate),
    [defaultValue, required, validate]
  );

  useEffect(() => {
    registerField({
      id,
      value: defaultValue,
      isValid: validator(),
    });
  }, [id, defaultValue, registerField, validator]);

  return { formState, updateField };
};
