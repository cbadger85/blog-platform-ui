import debounce from 'lodash/debounce';
import React, { ChangeEvent, useState } from 'react';
import { validateInput } from './utils';
import { useRegisterField } from './utils/useRegisterField';

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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isInputValid = validateInput(e.target.value, required, validate);

    e.persist();
    const handleShowErrors = debounce(() => {
      setShowErrorMessage(!validateInput(e.target.value, required, validate));
    }, 800);

    handleShowErrors();
    if (isInputValid) {
      handleShowErrors.cancel();
    }

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
              autoComplete="off"
              {...inputProps}
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

type InputProps = InputPropsWithValidation | InputPropsWithoutValidation;

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
  validate: (input: string) => boolean;
  validationMessage: string;
}
