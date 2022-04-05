import React from "react";
import { FormFieldWrapper } from "./FormField.styles";

interface Props {
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FormField = ({ id, name, placeholder, type, value, onChange }: Props) => {
  return (
    <FormFieldWrapper>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </FormFieldWrapper>
  );
};

export default FormField;
