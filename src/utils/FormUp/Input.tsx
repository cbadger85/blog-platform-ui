import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FormContext } from './state';
import _ from 'lodash';

export const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  defaultValue = '',
  required,
  validate,
  validationMessage,
}) => {
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const validator = (input: string): boolean => {
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

  useEffect(() => {
    registerField({
      id,
      value: defaultValue,
      isValid: validator(defaultValue),
    });
  }, [id, defaultValue, registerField]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isInputValid = validator(e.target.value);

    e.persist();
    const handleShowErrors = _.debounce(() => {
      setShowErrorMessage(!validator(e.target.value));
    }, 800);

    handleShowErrors();

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

interface InputPropsWithoutValidation {
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  validate?: never;
  validationMessage?: never;
}

interface InputPropsWithValidation {
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  validate: (input: string) => boolean;
  validationMessage: string;
}
