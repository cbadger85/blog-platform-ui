import React from 'react';
import { Form } from '../utils/FormUp/Form';
import { Input } from '../utils/FormUp/Input';

export const Test: React.FC = () => {
  return (
    <div>
      <Form submit={value => console.log(value)}>
        <Input id="name" placeholder="name" label="name" />
        <Input id="name2" placeholder="name2" label="name2" />
      </Form>
    </div>
  );
};
