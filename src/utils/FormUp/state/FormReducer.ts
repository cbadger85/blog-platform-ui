import { FormAction, FormActionType } from './actions';

export const formReducer = (
  state: FormState,
  { type, payload }: FormAction
) => {
  switch (type) {
    case FormActionType.UPDATE:
      return {
        ...state,
        [payload.id]: { value: payload.value, isValid: payload.isValid },
      };
    case FormActionType.REGISTER:
      return {
        ...state,
        [payload.id]: { value: payload.value || '', isValid: payload.isValid },
      };
    default:
      return state;
  }
};

export interface FormState {
  [id: string]: FormStateValue;
}

interface FormStateValue {
  value: string;
  isValid: boolean;
}
