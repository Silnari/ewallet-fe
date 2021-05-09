import { List } from "@material-ui/core";
import TransactionItem from "./TransactionItem";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import EventIcon from "@material-ui/icons/Event";
import moment from "moment";
import _ from "lodash";

export default function TransactionList({
  transactionList,
  sortBy,
  date,
  periodOfTime,
}) {
  const getPeriod = () => {
    if (periodOfTime === "w") return "isoWeek";
    if (periodOfTime === "M") return "month";
    return "year";
  };

  const getByTransactionType = (transactionType) => {
    const filteredByDate = transactionList.filter((transaction) =>
      moment(transaction.date).isSame(moment(date), getPeriod())
    );

    return filteredByDate.filter(
      (transaction) => transaction.transactionType === transactionType
    );
  };

  const getSortByList = (transactionList) => {
    const sortByList = _.orderBy(
      _.groupBy(transactionList, sortBy),
      [(item) => _.sumBy(item, "value")],
      "desc"
    );
    return _.map(sortByList, (x) => _.orderBy(x, "value", "desc"));
  };

  const getIcon = () =>
    sortBy === "category" ? <FolderOpenIcon /> : <EventIcon />;

  const getHeader = (transactionItem) =>
    sortBy === "date"
      ? moment(transactionItem[0].date).format("dddd, MMMM Do YYYY")
      : transactionItem[0].category;

  return (
    <List>
      {getSortByList(getByTransactionType("INCOME")).map((transactionItem) => (
        <TransactionItem
          key={transactionItem[0][sortBy] + "INCOME"}
          type="INCOME"
          icon={getIcon()}
          transactionList={transactionItem}
          sortBy={sortBy}
          header={getHeader(transactionItem)}
        />
      ))}
      {getSortByList(getByTransactionType("OUTCOME")).map((transactionItem) => (
        <TransactionItem
          key={transactionItem[0][sortBy] + "OUTCOME"}
          type="OUTCOME"
          icon={getIcon()}
          transactionList={transactionItem}
          sortBy={sortBy}
          header={getHeader(transactionItem)}
        />
      ))}
    </List>
  );
}
