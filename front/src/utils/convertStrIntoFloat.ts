const convertStrIntoFloat = (str: string) => {
  return parseFloat(str.replace(",", "."));
};

export default convertStrIntoFloat;
