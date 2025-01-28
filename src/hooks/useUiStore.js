import { useDispatch, useSelector } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../store";

export const useUiStore = () => {
  // obteniendo el estado de la apertura del modal
  const { isDateModalOpen } = useSelector((state) => state.ui);

  // dispatch para despachar acciones al
  const dispatch = useDispatch();

  // toggle para mostrar/ocultar modal
  const handletoggleModal = () => {
    if (isDateModalOpen) {
      dispatch(onCloseDateModal());
    } else {
      dispatch(onOpenDateModal());
    }
  };

  return {
    // atributos
    isDateModalOpen,
    // funciones
    handletoggleModal,
  };
};
