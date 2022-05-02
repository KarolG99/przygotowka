import React, { useState } from "react";

interface Props {
  initialFormState: {
    username?: string;
    password?: string;
    name?: string;
    repeatedPassword?: string;
  };
}

const useForm = ({ initialFormState }: Props) => {
  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return {
    formValues,
    setFormValues,
    handleInputChange,
  };
};

export default useForm;
