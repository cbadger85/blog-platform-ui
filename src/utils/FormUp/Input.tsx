import debounce from 'lodash/debounce';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FormState } from './state';
import { useRegisterField } from './utils';

export const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  defaultValue = '',
  required,
  validate,
  validationMessage,
  ...inputProps
}) => {
  const { formState, updateField } = useRegisterField(
    id,
    defaultValue,
    required,
    validate
  );

  const [showInputIsInvalidMessage, setShowInputIsInvalidMessage] = useState(
    false
  );
  const [showIsRequiredMessage, setShowIsRequiredMessage] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  const isValid = useMemo(
    () => validate && formState && validate(formState[id].value, formState),
    [formState, id, validate]
  );

  const isEmpty = useMemo(
    () => !!required && formState && !formState[id].value.trim(),
    [formState, id, required]
  );

  useEffect(() => {
    const handleShowErrors = debounce(() => {
      setShowInputIsInvalidMessage(!isValid);
      setShowIsRequiredMessage(isEmpty && hasBlurred);
    }, 500);

    handleShowErrors();

    return () => {
      handleShowErrors.cancel();
    };
  }, [setShowInputIsInvalidMessage, isValid, isEmpty, hasBlurred]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldValues = { id, value: e.target.value };
    const inputIsEmpty = !e.target.value.trim();
    const inputIsValid = validate && validate(e.target.value, formState);

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

  const handleOnBlur = () => {
    if (isEmpty && required) {
      setShowIsRequiredMessage(true);
    }

    if (!isValid && validate) {
      setShowInputIsInvalidMessage(true);
    }

    setHasBlurred(true);
  };

  const handleShowError = (): string => {
    if (showIsRequiredMessage) {
      return 'Required';
    }

    if (showInputIsInvalidMessage && validationMessage) {
      return validationMessage;
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
              onBlur={handleOnBlur}
              value={formState[id].value}
              id={id}
              placeholder={placeholder}
              {...inputProps}
            />
          </label>
          <div style={{ height: '1rem' }}>{handleShowError()}</div>
        </>
      )}
    </div>
  );
};

type InputProps = InputPropsWithoutValidation | InputPropsWithValidation;

interface InputPropsWithoutValidation
  extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  validate?: never;
  validationMessage?: never;
}

interface InputPropsWithValidation extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  validate: (input: string, formState: FormState) => boolean;
  validationMessage: string;
}
