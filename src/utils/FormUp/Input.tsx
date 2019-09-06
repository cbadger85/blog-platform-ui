import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FormState } from './state';
import { RequiredFunction } from './types';
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
  validationMessage,
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

  const handleErrorMessageType = useCallback(() => {
    const isEmpty = () => {
      if (!required || !formState) {
        return false;
      }

      if (typeof required === 'function') {
        return required(formState);
      }

      return true;
    };

    const isValid = () =>
      (validate && formState && validate(formState[id].value, formState)) ||
      (formState && formState[id].value.length === 0);

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
  }, [formState, hasBlurred, id, required, validate]);

  const handleShowError = (): string => {
    switch (errorMessageType) {
      case ErrorMessageType.REQUIRED:
        return requiredMessage;
      case ErrorMessageType.VALIDATION:
        return validationMessage || '';
      default:
        return '';
    }
  };

  useEffect(() => {
    handleErrorMessageType();
  }, [handleErrorMessageType]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldValues = { id, value: e.target.value };
    const inputIsEmpty =
      typeof required === 'function'
        ? required(formState)
        : !e.target.value.trim();
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

  return (
    <div>
      {formState && (
        <>
          <label htmlFor={id}>
            <span>
              {label}
              <span style={{ color: 'red' }}>
                {typeof required === 'function'
                  ? formState && required(formState) && '*'
                  : required && '*'}
              </span>
            </span>
            <input
              onChange={handleOnChange}
              onBlur={() => setHasBlurred(true)}
              value={formState[id].value}
              id={id}
              placeholder={placeholder}
              required={
                typeof required === 'function' ? required(formState) : required
              }
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

type InputElement = Omit<React.HTMLProps<HTMLInputElement>, 'required'>;
interface CommonInputProps extends InputElement {
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
  required?: never;
  requiredMessage?: never;
  validate: (input: string, formState: FormState) => boolean;
  validationMessage: string;
}

interface InputPropsWithRequired extends CommonInputProps {
  required: boolean | RequiredFunction;
  requiredMessage?: string;
  validate?: never;
  validationMessage?: never;
}

interface InputPropsWithValidationAndRequired extends CommonInputProps {
  required: boolean | RequiredFunction;
  requiredMessage?: string;
  validate: (input: string, formState: FormState) => boolean;
  validationMessage: string;
}
