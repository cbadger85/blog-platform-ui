import React, { ChangeEvent, useContext, useEffect } from 'react';
import { FormContext } from './state';

export const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  defaultValue = '',
  required,
  validate,
}) => {
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;

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
    const isValid = validator(defaultValue);
    registerField({
      id,
      value: defaultValue,
      isValid,
    });
  }, [id, defaultValue, registerField]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = validator(e.target.value);

    updateField({ id, value: e.target.value, isValid });
  };

  return (
    <div>
      {formState && (
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
          />
        </label>
      )}
    </div>
  );
};

interface InputProps {
  id: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  validate?: (input: string) => boolean;
}
