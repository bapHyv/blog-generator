const formatedDate = (date: string) => {
  const _date = new Date(date);
  return `${_date.getDay() < 10 ? `0${_date.getDay()}` : _date.getDay()}-${
    _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth()
  }-${_date.getFullYear()}`;
};

export default formatedDate;
