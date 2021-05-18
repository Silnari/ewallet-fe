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

export const groupByCategory = (transactionList) => {
  const groupedArr = [];
  const categoryList = [...new Set(transactionList.map((t) => t.category))];
  categoryList.forEach((category) => {
    groupedArr.push({
      name: category,
      value: getOutcomeSum(
        transactionList.filter((t) => t.category === category)
      ),
    });
  });

  return groupedArr;
};

export const groupByMonth = (transactionList, categoryList) => {
  const grouped = _.groupBy(
    transactionList.filter(
      (t) =>
        categoryList.includes(t.category) ||
        (categoryList.includes("Income total") &&
          t.transactionType === "INCOME") ||
        (categoryList.includes("Outcome total") &&
          t.transactionType === "OUTCOME")
    ),
    (transaction) => moment(transaction.date).startOf("month").format("MMM")
  );

  const groupedArr = [];
  months.forEach((month, index) => {
    groupedArr.push({ month });
    categoryList.forEach((category) => {
      if (grouped[month]) {
        if (category === "Income total")
          groupedArr[index][category] = getIncomeSum(grouped[month]);
        else if (category === "Outcome total")
          groupedArr[index][category] = getOutcomeSum(grouped[month]);
        else {
          groupedArr[index][category] = Math.abs(
            getSum(grouped[month].filter((t) => t.category === category))
          );
        }
      }
    });
  });

  return groupedArr;
};
