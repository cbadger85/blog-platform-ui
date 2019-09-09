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
  className = '',
  style,
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
  });

  return (
    <div style={style} className={className}>
      {formState && (
        <>
          <label htmlFor={id ? id : undefined}>
            <div className={styles.inputFieldWrapper}>
              <span className={styles.inputLabel}>
                {label ? (
                  <>
                    <span className={styles.inputLabel_text}>{label}</span>
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
                className={`${styles.input} ${errorMessage &&
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
    </div>
  );
};

type InputProps =
  | InputPropsWithoutValidationAndRequired
  | InputPropsWithValidation;

type InputElement = Omit<React.HTMLProps<HTMLInputElement>, 'required'>;
interface CommonInputProps extends InputElement {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  style?: React.CSSProperties;
  required?: boolean | RequiredFunction;
}

interface InputPropsWithoutValidationAndRequired extends CommonInputProps {
  validate?: never;
  validationMessage?: never;
}

interface InputPropsWithValidation extends CommonInputProps {
  validate: (input: string, formState: FormState) => boolean;
  validationMessage: string;
}
