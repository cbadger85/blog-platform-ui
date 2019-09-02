import React, { FormEvent, useContext } from 'react';
import { FormProvider, FormState, FormContext } from './FormProvider';
import _ from 'lodash';

export const Form: React.FC<FormProps> = ({ children, submit }) => {
  const { formState } = useContext(FormContext) as FormContext;

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (_.isEmpty(formState)) {
      return;
    }

    submit(formState);
  };

  return (
    <FormProvider>
      <form onSubmit={handleOnSubmit}>{children}</form>
    </FormProvider>
  );
};

interface FormProps {
  submit: (values: FormState) => void;
}
