export const removeDoubleQuotes = (string) => {
  return string.replace(/['"]+/g, "");
};
