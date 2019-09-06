export enum FormActionType {
  UPDATE = 'UPDATE',
  REGISTER = 'REGISTER',
  IS_VALID = 'IS_VALID',
}

export const registerFieldAction = (payload: RegisterActionPayload) => ({
  type: FormActionType.REGISTER,
  payload,
});

export const updateFieldAction = (payload: UpdateFieldActionPayload) => ({
  type: FormActionType.UPDATE,
  payload,
});

export const updateIsValidAction = (payload: UpdateIsValidActionPayload) => ({
  type: FormActionType.IS_VALID,
  payload,
});

export interface FormAction {
  type: FormActionType;
  payload:
    | UpdateFieldActionPayload
    | UpdateIsValidActionPayload
    | RegisterActionPayload;
}

export interface UpdateFieldActionPayload {
  name: string;
  value: string;
  isValid?: never;
}

export interface UpdateIsValidActionPayload {
  name: string;
  isValid: boolean;
  value?: never;
}

export interface RegisterActionPayload {
  name: string;
  value?: string;
  isValid: boolean;
}
