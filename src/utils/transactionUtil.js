import _ from "lodash";

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
