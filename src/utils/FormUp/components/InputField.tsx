import React from 'react';
import { FormState } from '../state';
import { RequiredFunction } from '../types';
import { useRegisterField, useFieldValidation } from '../utils';

export const InputField: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  defaultValue = '',
  required,
  validate,
  id,
  validationMessage,
  requiredMessage,
  ...inputProps
}) => {
  const { formState, updateField } = useRegisterField({
    name,
    defaultValue,
    required,
    validate,
  });

  const { setHasBlurred, errorMessage } = useFieldValidation({
    name,
    required,
    validate,
    validationMessage,
    requiredMessage,
  });

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
              name={name}
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
          <div style={{ height: '1rem' }}>{errorMessage}</div>
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
