import _ from 'lodash';
import React, { FormEvent, useCallback, useReducer } from 'react';
import {
  FormActionType,
  FormContext,
  formReducer,
  FormState,
  RegisterActionPayload,
  UpdateActionPayload,
  updateFieldAction,
} from '../state';

export const Form: React.FC<FormProps> = ({ children, submit }) => {
  const [formState, formDispatch] = useReducer(formReducer, undefined as never);

  const updateField = useCallback(
    (payload: UpdateActionPayload) => formDispatch(updateFieldAction(payload)),
    [formDispatch]
  );

  const registerField = useCallback(
    (payload: RegisterActionPayload) =>
      formDispatch({ type: FormActionType.REGISTER, payload }),
    [formDispatch]
  );

  const context = {
    formState,
    updateField,
    registerField,
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formState) {
      return;
    }

    const data = _.mapValues(formState as FormState, field => field.value);

    submit(data);
  };

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={handleOnSubmit}>
        {children}
        <button type="submit">click here</button>
      </form>
    </FormContext.Provider>
  );
};

interface FormProps {
  submit: (values: FormData) => void;
}

interface FormData {
  [id: string]: string;
}
