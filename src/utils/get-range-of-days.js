const getRangeOfDays = (range) => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(endDate.getDate() - range);

  const format = (date) => date.toISOString().split("T")[0];

  return {
    startDate: format(startDate),
    endDate: format(endDate),
  };
};

export default getRangeOfDays;
