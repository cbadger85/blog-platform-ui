import React, { ChangeEvent, useContext, useEffect } from 'react';
import { FormContext } from '../state';

export const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  defaultValue,
}) => {
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;

  useEffect(() => {
    registerField({
      id,
      value: defaultValue,
      isValid: true,
    });
  }, [id, defaultValue, registerField]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateField({ id, value: e.target.value, isValid: true });
  };

  return (
    <div>
      {formState && (
        <label htmlFor={id}>
          {label}
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
  label: string;
  placeholder?: string;
  defaultValue?: string;
}
