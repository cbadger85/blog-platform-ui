import { createContext } from 'react';
import { FormState } from './FormReducer';
import { UpdateActionPayload, RegisterActionPayload } from './actions';

export * from './FormReducer';
export * from './actions';

export const FormContext = createContext({});

export interface FormContext {
  formState: FormState;
  updateField: (payload: UpdateActionPayload) => void;
  registerField: (payload: RegisterActionPayload) => void;
}
