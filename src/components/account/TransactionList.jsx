import { List } from "@material-ui/core";
import TransactionItem from "./TransactionItem";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import EventIcon from "@material-ui/icons/Event";
import { format } from "../../utils/dateUtil";
import {
  getIncome,
  getOutcome,
  filterTransactionsByDate,
  sortGrouped,
} from "../../utils/transactionUtil";
import { useTransactionList } from "../../providers/TransactionListProvider";

export default function TransactionList({ sortBy, date, periodOfTime }) {
  const { transactionList } = useTransactionList();

  const getIcon = () =>
    sortBy === "category" ? <FolderOpenIcon /> : <EventIcon />;

  const getHeader = (transactionItem) =>
    sortBy === "date"
      ? format(transactionItem[0].date)
      : transactionItem[0].category;

  return (
    <List>
      {sortGrouped(
        filterTransactionsByDate(
          getIncome(transactionList),
          date,
          periodOfTime
        ),
        sortBy
      ).map((transactionItem) => (
        <TransactionItem
          key={transactionItem[0][sortBy] + "INCOME"}
          type="INCOME"
          icon={getIcon()}
          transactionList={transactionItem}
          sortBy={sortBy}
          header={getHeader(transactionItem)}
        />
      ))}
      {sortGrouped(
        filterTransactionsByDate(
          getOutcome(transactionList),
          date,
          periodOfTime
        ),
        sortBy
      ).map((transactionItem) => (
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
