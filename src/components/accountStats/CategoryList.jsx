import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useTransactionList } from "../../providers/TransactionListProvider";

export default function CategoryList({ checked, setChecked }) {
  const { transactionList } = useTransactionList();
  const categoryList = transactionList
    .map(
      (transaction) =>
        `${transaction.category}^${
          transaction.transactionType === "INCOME" ? "INCOME" : "OUTCOME"
        }`
    )
    .filter((category, index, self) => self.indexOf(category) === index);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {["Income total^INCOME", "Outcome total^OUTCOME", ...categoryList].map(
        (category) => (
          <ListItem
            key={category}
            dense
            button
            onClick={handleToggle(category)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(category) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={category.split("^")[0]} />
          </ListItem>
        )
      )}
    </List>
  );
}
