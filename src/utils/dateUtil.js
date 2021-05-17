import moment from "moment";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getPeriod = (periodOfTime) => {
  if (periodOfTime === "w") return "isoWeek";
  if (periodOfTime === "M") return "month";
  return "year";
};

export const formatDate = (date, periodOfTime) => {
  let m = moment(date);
  if (periodOfTime === "w")
    return (
      m.startOf("isoweek").format("MMMM Do") +
      " - " +
      m.clone().startOf("isoweek").add(6, "d").format("MMMM Do[, ]YYYY")
    );
  if (periodOfTime === "M") return m.format("MMMM[, ]YYYY");
  if (periodOfTime === "y") return m.format("YYYY");
};

export const format = (date) => moment(date).format("dddd, MMMM Do YYYY");

export const addToDate = (date, periodOfTime) => {
  var m = moment(date);

  return periodOfTime === "d"
    ? m.add(7, periodOfTime).toDate()
    : m.add(1, periodOfTime).toDate();
};

export const substractFromDate = (date, periodOfTime) => {
  var m = moment(date);

  return periodOfTime === "d"
    ? m.subtract(7, periodOfTime).toDate()
    : m.subtract(1, periodOfTime).toDate();
};

export const isNextAvaible = (date, periodOfTime) =>
  moment(new Date()).isSame(moment(addToDate(date, periodOfTime)), "day");
