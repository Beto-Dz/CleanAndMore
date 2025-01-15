import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  // estado de formulario
  const [formState, setFormState] = useState(initialForm);

  // estado para las validaciones
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    const objeto = {};
    Object.keys(formValidations).forEach((key) => {
      objeto[`${key}Valid`] = formValidations[key]?.(formState[key]);
    });
    setFormValidation(objeto);
  }, []);

  // funcion para saber si el formulario está listo para ser enviado al backend
  const isValidForm = useMemo(() => {
    const isValid = Object.keys(formValidations).map((key) => formValidation[`${key}Valid`]);
    return isValid.every((value) => value);
  }, [formValidation]);

  // cuando cambie el formulario
  const handleOnInputChange = ({ target }) => {
    // desestructurando
    const { name, value } = target;
    // actualizando el estado del formulario
    setFormState({ ...formState, [name]: value });
    // Obtener la validación dinámica para el campo
    const isValid = formValidations[name]?.(value);
    setFormValidation({ ...formValidation, [`${name}Valid`]: isValid });
  };

  return {
    ...formState,
    ...formValidation,
    formObject: formState,
    handleOnInputChange,
    isValidForm,
  };
};
