export enum FormActionType {
  UPDATE = 'UPDATE',
  REGISTER = 'REGISTER',
}

export const registerFieldAction = (payload: RegisterActionPayload) => ({
  type: FormActionType.REGISTER,
  payload,
});

export const updateFieldAction = (payload: UpdateActionPayload) => ({
  type: FormActionType.UPDATE,
  payload,
});

export interface FormAction {
  type: FormActionType;
  payload: UpdateActionPayload | RegisterActionPayload;
}

export interface UpdateActionPayload {
  id: string;
  value: string;
  isValid: boolean;
}

export interface RegisterActionPayload {
  id: string;
  value?: string;
  isValid: boolean;
}
