import React from 'react';
import { FormState } from '../state';
import { RequiredFunction } from '../types';
import { useRegisterField, useFieldValidation } from '../utils';
import styles from './inputField.module.css';

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
  className = '',
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
    <>
      {formState && (
        <>
          <label htmlFor={id ? id : undefined}>
            <div className={styles.inputFieldWrapper}>
              <span className={styles.inputLabel}>
                {label ? (
                  <>
                    {label}
                    {typeof required === 'function'
                      ? formState &&
                        required(formState) && (
                          <span className={styles.inputLabel_required} />
                        )
                      : required && (
                          <span className={styles.inputLabel_required} />
                        )}
                  </>
                ) : (
                  <span className={styles.input_required} />
                )}
              </span>
              <input
                className={`${styles.input} ${className} ${errorMessage &&
                  styles.input_error}`}
                name={name}
                onChange={e => updateField({ name, value: e.target.value })}
                onBlur={() => setHasBlurred(true)}
                value={formState[name].value}
                id={id}
                placeholder={placeholder}
                required={
                  typeof required === 'function'
                    ? required(formState)
                    : required
                }
                {...inputProps}
              />
            </div>
            <div
              className={`${styles.inputErrorMessage} ${errorMessage &&
                styles.inputErrorMessage_visible}`}
            >
              <span className={styles.errorIcon}>!</span>
              {errorMessage}
            </div>
          </label>
        </>
      )}
    </>
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
  className?: string;
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
