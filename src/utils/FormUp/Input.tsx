import React, { useEffect, useMemo, useState } from 'react';
import { FormState } from './state';
import { RequiredFunction } from './types';
import { useRegisterField } from './utils';

enum ErrorMessageType {
  REQUIRED = 'REQUIRED',
  VALIDATION = 'VALIDATION',
  NONE = 'NONE',
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  defaultValue = '',
  required,
  validate,
  id,
  validationMessage,
  requiredMessage = 'Required',
  ...inputProps
}) => {
  const { formState, updateField, updateIsValid } = useRegisterField(
    name,
    defaultValue,
    required,
    validate
  );

  const [hasBlurred, setHasBlurred] = useState(false);
  const [errorMessageType, setErrorMessageType] = useState(
    ErrorMessageType.NONE
  );

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
    const setErrorMessage = () => {
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
    };

    updateIsValid({ name, isValid: !isEmpty && isValid });
    setErrorMessage();
  }, [hasBlurred, isEmpty, isValid, name, updateIsValid]);

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

  return (
    <div>
      {formState && (
        <>
          <label htmlFor={id ? id : undefined}>
            <span>
              {label}
              <span style={{ color: 'red' }}>
                {typeof required === 'function'
                  ? formState && required(formState) && '*'
                  : required && '*'}
              </span>
            </span>
            <input
              onChange={e => updateField({ name, value: e.target.value })}
              onBlur={() => setHasBlurred(true)}
              value={formState[name].value}
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
  name: string;
  id?: string;
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
