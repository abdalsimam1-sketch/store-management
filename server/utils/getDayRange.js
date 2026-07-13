const { addDays, startOfDay } = require("date-fns");
const getDayRange = () => {
  const startOfToday = startOfDay(new Date());
  const startOfTommorow = addDays(startOfToday, 1);
  return { startOfToday, startOfTommorow };
};
module.exports = { getDayRange };
