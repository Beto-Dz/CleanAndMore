export const patterns = {
  onlyLetters: {
    html: "[A-Za-zÁÉÍÓÚáéíóúÑñs]+",
    js: /^[A-Za-zÁÉÍÓÚáéíóúÑñs]+$/,
  },
  onlyNumbers: {
    html: "\\d+",
    js: /^\d+$/,
  },
};
