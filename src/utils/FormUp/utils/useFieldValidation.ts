import { useEffect, useMemo, useState, useContext } from 'react';
import { FormContext, FormState } from '../state';
import { RequiredFunction } from '../types';
import lowerCase from 'lodash/lowerCase';
import capitalize from 'lodash/capitalize';

export const useFieldValidation = ({
  name,
  required,
  validate,
  validationMessage,
}: UseFieldValidation) => {
  const [hasBlurred, setHasBlurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { formState, updateIsValid } = useContext(FormContext) as FormContext;

  const isEmpty = useMemo(() => {
    if (!required || !formState) {
      return false;
    }

    if (typeof required === 'function') {
      return required(formState);
    }

    return formState[name].value.length === 0;
  }, [formState, name, required]);

  const isValid = useMemo(() => {
    if (!validate || !formState) {
      return true;
    }

    return validate(formState[name].value, formState);
  }, [formState, name, validate]);

  useEffect(() => {
    const handleSetErrorMessage = () => {
      if (!hasBlurred) {
        return;
      }

      if (isEmpty) {
        setErrorMessage(`${capitalize(lowerCase(name))} is required`);
        return;
      }

      if (!isValid) {
        setErrorMessage(validationMessage || '');
        return;
      }
      setErrorMessage('');
    };

    updateIsValid({ name, isValid: !isEmpty && isValid });
    handleSetErrorMessage();
  }, [hasBlurred, isEmpty, isValid, name, updateIsValid, validationMessage]);

  return { setHasBlurred, errorMessage };
};

interface UseFieldValidation {
  name: string;
  required?: boolean | RequiredFunction;
  requiredMessage?: string;
  validate?: (input: string, formState: FormState) => boolean;
  validationMessage?: string;
}
