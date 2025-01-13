import { Provider } from "react-redux";
import { RouterApp } from "./router/RouterApp";
import { store } from "./store/store";

export const MauGarces = () => {
  return (
    <Provider store={store}>
      <RouterApp />
    </Provider>
  );
};