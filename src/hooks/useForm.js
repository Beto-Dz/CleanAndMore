import { useState } from "react";

export const useForm = (initialForm = {}) => {
  // estado de formulario
  const [formState, setFormState] = useState(initialForm);

  // cuando cambie el formulario
  const handleOnInputChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  return {
    ...formState,
    formObject: formState,
    handleOnInputChange,
  };
};
