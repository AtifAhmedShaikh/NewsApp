export const capitalizeWords = (text) => {
  return text.replace(/\b\w/g, (m) => m.toUpperCase());
};
