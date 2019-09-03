import debounce from 'lodash/debounce';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRegisterField, validateInput } from './utils';
import { FormState } from './state';

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

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [hasRecievedFocus, setHasRecievedFocus] = useState(false);

  useEffect(() => {
    const handleShowErrors = debounce(() => {
      validate &&
        setShowErrorMessage(
          !validateInput(formState[id].value, formState, required, validate)
        );
    }, 500);

    hasRecievedFocus && handleShowErrors();
    return () => {
      handleShowErrors.cancel();
    };
  }, [formState, id, required, validate, hasRecievedFocus]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isInputValid = validateInput(
      e.target.value,
      formState,
      required,
      validate
    );

    updateField({ id, value: e.target.value, isValid: isInputValid });
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
              value={formState[id].value}
              onChange={handleOnChange}
              id={id}
              placeholder={placeholder}
              {...inputProps}
              onFocus={() => setHasRecievedFocus(true)}
            />
          </label>
          <div style={{ height: '1rem' }}>
            {showErrorMessage && validationMessage}
          </div>
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

// interface InputPropsWithValidationAndFormState
//   extends React.HTMLProps<HTMLInputElement> {
//   id: string;
//   label?: string;
//   placeholder?: string;
//   defaultValue?: string;
//   required?: boolean;
//   validate: (input: string, formState: FormState) => boolean;
//   validationMessage: string;
// }
