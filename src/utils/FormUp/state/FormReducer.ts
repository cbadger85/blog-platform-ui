import { FormAction, FormActionType } from './actions';

export const formReducer = (
  state: FormState,
  { type, payload }: FormAction
) => {
  switch (type) {
    case FormActionType.UPDATE:
      return {
        ...state,
        [payload.name]: { ...state[payload.name], value: payload.value },
      };
    case FormActionType.REGISTER:
      return {
        ...state,
        [payload.name]: {
          value: payload.value || '',
          isValid: payload.isValid,
        },
      };
    case FormActionType.IS_VALID:
      return {
        ...state,
        [payload.name]: { ...state[payload.name], isValid: payload.isValid },
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
