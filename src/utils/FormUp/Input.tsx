import debounce from 'lodash/debounce';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FormContext } from './state';

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
  const { formState, updateField, registerField } = useContext(
    FormContext
  ) as FormContext;
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const validator = useCallback(
    (input: string): boolean => {
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
    },
    [required, validate]
  );

  useEffect(() => {
    registerField({
      id,
      value: defaultValue,
      isValid: validator(defaultValue),
    });
  }, [id, defaultValue, registerField, validator]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isInputValid = validator(e.target.value);

    e.persist();
    const handleShowErrors = debounce(() => {
      setShowErrorMessage(!validator(e.target.value));
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
