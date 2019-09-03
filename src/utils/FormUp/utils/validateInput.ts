import { FormState } from '../state';

export const validateInput = (
  input: string,
  formState: FormState,
  required: boolean | undefined,
  validate?: (input: string, formState: FormState) => boolean
): boolean => {
  const hasPassedValidation =
    validate && formState && validate(input, formState);
  const isEmpty = !input.trim();

  if (required && validate && !hasPassedValidation) {
    return false;
  }

  if (required && isEmpty) {
    return false;
  }

  if (validate && !hasPassedValidation) {
    return false;
  }

  return true;
};
