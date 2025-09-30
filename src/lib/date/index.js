export const generateFutureDate = (mins = 20) => {
  const minutesToAdd = mins;
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

  return futureDate;
};

export const generateCurrentDate = () => {
  return new Date();
};

export const compareTwoDates = (firstDate, secondDate) => {
  // 10-10-2020 - 10-12-2020 -> NOW -> TIME+20
  if (firstDate > secondDate) {
    return false;
  }
  return true;
};

export const formatTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${("0" + date.getMinutes()).slice(
    -2
  )}`;
  return formattedDate;
};
