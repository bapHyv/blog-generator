const formatedDate = (date: string) => {
  const _date = new Date(date);
  return `${_date.getDate() < 10 ? `0${_date.getDate()}` : _date.getDate()}-${
    _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth()
  }-${_date.getFullYear()}`;
};

export default formatedDate;
