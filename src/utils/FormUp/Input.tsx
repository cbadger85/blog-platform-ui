// TODO change required to an optional callback or boolean

import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { FormState } from './state';
import { useRegisterField } from './utils';

enum ErrorMessageType {
  REQUIRED = 'REQUIRED',
  VALIDATION = 'VALIDATION',
  NONE = 'NONE',
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  defaultValue = '',
  required,
  validate,
  validationMessage = 'Failed validation',
  requiredMessage = 'Required',
  ...inputProps
}) => {
  const { formState, updateField } = useRegisterField(
    id,
    defaultValue,
    required,
    validate
  );

  const [hasBlurred, setHasBlurred] = useState(false);
  const [errorMessageType, setErrorMessageType] = useState(
    ErrorMessageType.NONE
  );

  const isValid = useMemo(
    () =>
      (validate && formState && validate(formState[id].value, formState)) ||
      (formState && formState[id].value.length === 0),
    [formState, id, validate]
  );

  const isEmpty = useMemo(
    () => !!required && formState && !formState[id].value.trim(),
    [formState, id, required]
  );

  const handleErrorMessageType = useCallback(() => {
    if (!hasBlurred) {
      return;
    }

    if (isEmpty) {
      setErrorMessageType(ErrorMessageType.REQUIRED);
      return;
    }

    if (!isValid) {
      setErrorMessageType(ErrorMessageType.VALIDATION);
      return;
    }

    setErrorMessageType(ErrorMessageType.NONE);
  }, [hasBlurred, isEmpty, isValid]);

  useEffect(() => {
    handleErrorMessageType();
  }, [handleErrorMessageType]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldValues = { id, value: e.target.value };
    const inputIsEmpty = !e.target.value.trim();
    const inputIsValid =
      (validate && validate(e.target.value, formState)) ||
      e.target.value.length === 0;

    if (required && inputIsEmpty) {
      updateField({ ...fieldValues, isValid: false });
      return;
    }

    if (validate && !inputIsValid) {
      updateField({ ...fieldValues, isValid: false });
      return;
    }

    updateField({ ...fieldValues, isValid: true });
  };

  const handleShowError = (): string => {
    if (errorMessageType === ErrorMessageType.REQUIRED) {
      return requiredMessage;
    }

    if (errorMessageType === ErrorMessageType.VALIDATION) {
      return validationMessage || '';
    }

    return '';
  };

  return (
    <div>
      {formState && (
        <>
          <label htmlFor={id}>
            <span>
              {label}
              <span style={{ color: 'red' }}>{required && '*'}</span>
            </span>
            <input
              onChange={handleOnChange}
              onBlur={() => setHasBlurred(true)}
              value={formState[id].value}
              id={id}
              placeholder={placeholder}
              required={required}
              {...inputProps}
            />
          </label>
          <div style={{ height: '1rem' }}>{handleShowError()}</div>
        </>
      )}
    </div>
  );
};

type InputProps =
  | InputPropsWithoutValidationAndRequired
  | InputPropsWithValidation
  | InputPropsWithRequired
  | InputPropsWithValidationAndRequired;

interface CommonInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
}

interface InputPropsWithoutValidationAndRequired extends CommonInputProps {
  required?: never;
  requiredMessage?: never;
  validate?: never;
  validationMessage?: never;
}

interface InputPropsWithValidation extends CommonInputProps {
  required?: boolean;
  requiredMessage?: string;
  validate: (input: string, formState: FormState) => boolean;
  validationMessage: string;
}

interface InputPropsWithRequired extends CommonInputProps {
  required: boolean;
  requiredMessage?: string;
  validate?: never;
  validationMessage?: never;
}

interface InputPropsWithValidationAndRequired extends CommonInputProps {
  required: boolean;
  requiredMessage?: string;
  validate: (input: string, formState: FormState) => boolean;
  validationMessage: string;
}
