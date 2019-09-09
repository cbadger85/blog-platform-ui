import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';
import React, { FormEvent, useCallback, useReducer } from 'react';
import {
  FormActionType,
  FormContext,
  formReducer,
  FormState,
  RegisterActionPayload,
  updateFieldAction,
  UpdateFieldActionPayload,
} from '../state';
import { Button } from './Button';

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  submitText,
  onCancel,
  cancelText,
  submitButtonAs,
  cancelButtonAs,
}) => {
  const [formState, formDispatch] = useReducer(formReducer, undefined as never);

  const updateField = useCallback(
    (payload: UpdateFieldActionPayload) =>
      formDispatch(updateFieldAction(payload)),
    [formDispatch]
  );

  const registerField = useCallback(
    (payload: RegisterActionPayload) =>
      formDispatch({ type: FormActionType.REGISTER, payload }),
    [formDispatch]
  );

  const updateIsValid = useCallback(
    (payload: RegisterActionPayload) =>
      formDispatch({ type: FormActionType.IS_VALID, payload }),
    [formDispatch]
  );

  const context = {
    formState,
    updateField,
    registerField,
    updateIsValid,
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formState || isEmpty(formState)) {
      return;
    }

    const data = mapValues(formState as FormState, field => field.value);

    onSubmit(data);
  };

  const handleOnCancel = () => {
    onCancel && onCancel();
  };

  const formIsInvalid = (): boolean => {
    if (!formState || isEmpty(formState)) {
      return false;
    }

    return Object.values(formState as FormState)
      .map(data => data.isValid)
      .some(data => data === false);
  };

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={handleOnSubmit}>
        {children}
        <div style={{ marginLeft: '8.2rem' }}>
          {submitButtonAs ? (
            submitButtonAs({
              onSubmit: handleOnSubmit,
              disabled: formIsInvalid(),
              formState,
            })
          ) : (
            <Button
              type="submit"
              disabled={formIsInvalid()}
              style={{ margin: '.5rem', padding: '.2rem .5rem' }}
            >
              {submitText ? submitText : 'Submit'}
            </Button>
          )}
          {(onCancel || cancelButtonAs) && (
            <>
              {cancelButtonAs ? (
                cancelButtonAs()
              ) : (
                <Button
                  type="button"
                  onClick={handleOnCancel}
                  style={{ margin: '.5rem', padding: '.2rem .5rem' }}
                >
                  {cancelText ? cancelText : 'cancel'}
                </Button>
              )}
            </>
          )}
        </div>
      </form>
    </FormContext.Provider>
  );
};

type FormProps = FormPropsCancelButton | FormPropsInjectedCancelButton;

interface FormBaseProps {
  onSubmit: (values: FormData) => void;
  submitText?: string;
  cancelText?: string;
  submitButtonAs?: React.FC<SubmitButtonProps>;
}

interface FormPropsCancelButton extends FormBaseProps {
  onCancel?: () => void;
  cancelButtonAs?: never;
}

interface FormPropsInjectedCancelButton extends FormBaseProps {
  onCancel?: never;
  cancelButtonAs?: () => JSX.Element;
}

export interface FormData {
  [name: string]: string;
}

export interface SubmitButtonProps {
  onSubmit: (e: FormEvent<Element>) => void;
  disabled: boolean;
  formState: FormState;
}

interface InjectedCancelButtonProps {
  formState: FormState;
}
