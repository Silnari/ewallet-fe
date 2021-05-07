import { List } from "@material-ui/core";
import TransactionItem from "./TransactionItem";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

export default function TransactionList({ transactionList, sortBy }) {
  const getSortByList = () => {
    var _ = require("lodash");
    const sortByList = _.orderBy(
      _.groupBy(transactionList, sortBy),
      [
        function (item) {
          return _.sumBy(item, "value");
        },
      ],
      "desc"
    );
    return _.map(sortByList, (x) => _.orderBy(x, "value", "desc"));
  };

  getSortByList();
  return (
    <List>
      {getSortByList().map((transactionItem) => (
        <TransactionItem
          key={transactionItem[0].category}
          icon={<FolderOpenIcon />}
          transactionList={transactionItem}
          sortBy={sortBy}
          header={transactionItem[0].category}
        />
      ))}
    </List>
  );
}
