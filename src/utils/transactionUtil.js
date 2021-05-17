import _ from "lodash";
import moment from "moment";
import { getPeriod, months } from "./dateUtil";

export const getIncome = (transactionList) =>
  getByTransactionType(transactionList, ["INCOME", "TRANSFER-INCOME"]);

export const getOutcome = (transactionList) =>
  getByTransactionType(transactionList, ["OUTCOME", "TRANSFER-OUTCOME"]);

const getByTransactionType = (transactionList, transactionTypes) =>
  transactionList.filter((t) => transactionTypes.includes(t.transactionType));

const getTransactionSum = (transactionList) =>
  _.sumBy(getIncome(transactionList), "value") -
  _.sumBy(getOutcome(transactionList), "value");

export const getAccountBalance = (startBalance, transactionList) =>
  _.round(startBalance + getTransactionSum(transactionList), 2);

export const getIncomeSum = (transactionList) =>
  _.round(getTransactionSum(getIncome(transactionList)), 2);

export const getOutcomeSum = (transactionList) =>
  -_.round(getTransactionSum(getOutcome(transactionList)), 2);

export const getSum = (transactionList) =>
  _.round(getTransactionSum(transactionList), 2);

export const sortGrouped = (transactionList, groupBy) => {
  const grouped = _.orderBy(
    _.groupBy(transactionList, groupBy),
    [(t) => _.sumBy(t, "value")],
    "desc"
  );
  return _.map(grouped, (t) => _.orderBy(t, "value", "desc"));
};

export const filterTransactionsByDate = (transactionList, date, periodOfTime) =>
  transactionList.filter((transaction) =>
    moment(transaction.date).isSame(moment(date), getPeriod(periodOfTime))
  );

export const groupByMonth = (transactionList, category) => {
  const grouped = _.groupBy(
    transactionList.filter((t) => t.category === category),
    (transaction) => moment(transaction.date).startOf("month").format("MMMM")
  );

  const groupedArr = [];
  months.forEach((month) => {
    groupedArr.push({
      category,
      month,
      value: grouped[month] && Math.abs(getSum(grouped[month])),
    });
  });

  return groupedArr.sort(
    (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
  );
};
