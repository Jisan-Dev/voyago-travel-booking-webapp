export const isDateInBetween = (date: string, start: string, end: string) => {
  return (
    new Date(date).getTime() >= new Date(start).getTime() &&
    new Date(date).getTime() <= new Date(end).getTime()
  );
};
export const getDayDifference = (from: string, to: string) => {
  return (new Date(to).getTime() - new Date(from).getTime()) / (24 * 60 * 60 * 1000) + 1;
};
