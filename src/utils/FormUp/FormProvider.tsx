import React, { createContext, useReducer } from 'react';

export const FormContext = createContext({});

export enum FormActionType {
  UPDATE = 'UPDATE',
  REGISTER = 'REGISTER',
}

const formReducer = (state: FormState, { type, payload }: FormAction) => {
  switch (type) {
    case FormActionType.UPDATE:
      return { ...state, [payload.id]: payload.value };
    case FormActionType.REGISTER:
      return {
        ...state,
        [payload.id]: { value: payload.value || '', isValid: payload.isValid },
      };
    default:
      return state;
  }
};

export const FormProvider: React.FC = ({ children }) => {
  const intialState: FormState = {};
  const [formState, formDispatch] = useReducer(formReducer, intialState);

  const context = {
    formState,
    updateField: (payload: FormActionPayload) =>
      formDispatch({
        type: FormActionType.UPDATE,
        payload,
      }),
    registerField: (payload: FormActionPayload) =>
      formDispatch({ type: FormActionType.UPDATE, payload }),
  };

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

export interface FormContext {
  formState: FormState;
  updateField: (payload: FormActionPayload) => void;
  registerField: (payload: FormActionPayload) => void;
}

export interface FormState {
  [id: string]: FormStateValue | unknown;
}

interface FormStateValue {
  value: string;
  isValid: boolean;
}

interface FormAction {
  type: FormActionType;
  payload: FormActionPayload;
}

interface FormActionPayload {
  id: string;
  value: string;
  isValid: boolean;
}
