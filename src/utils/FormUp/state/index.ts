import { createContext } from 'react';
import { FormState } from './FormReducer';
import {
  UpdateFieldActionPayload,
  RegisterActionPayload,
  UpdateIsValidActionPayload,
} from './actions';

export * from './FormReducer';
export * from './actions';

export const FormContext = createContext({});

export interface FormContext {
  formState: FormState;
  updateField: (payload: UpdateFieldActionPayload) => void;
  registerField: (payload: RegisterActionPayload) => void;
  updateIsValid: (payload: UpdateIsValidActionPayload) => void;
}
