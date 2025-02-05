export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const todayInMs = getToday().getTime();
export const oneHourInMs = 60 * 60 * 1000;
export const oneDayInMs = 24 * oneHourInMs;
