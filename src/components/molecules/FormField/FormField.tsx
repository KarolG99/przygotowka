import React from "react";
import { FormFieldProps } from "../../../types";
import { FormFieldWrapper } from "./FormField.styles";

const FormField = ({
  id,
  name,
  placeholder,
  type = "string",
  value,
  onChange,
  required,
}: FormFieldProps) => {
  return (
    <FormFieldWrapper>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </FormFieldWrapper>
  );
};

export default FormField;
