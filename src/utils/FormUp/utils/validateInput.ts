export const validateInput = (
  input: string,
  required: boolean | undefined,
  validate: ((input: string) => boolean) | undefined
): boolean => {
  const hasPassedValidation = validate && validate(input);
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
