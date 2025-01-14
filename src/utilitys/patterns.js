export const patterns = {
  onlyLetters: {
    html: "[A-Za-zÁÉÍÓÚáéíóúÑñs ]+",
    js: /^[A-Za-zÁÉÍÓÚáéíóúÑñs ]+$/,
  },
  onlyNumbers: {
    html: "\\d{6,}",
    js: /^\d{6,}$/,
  },
};
