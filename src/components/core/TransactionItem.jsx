import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useState } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  transactionSubItem: {
    textAlign: "right",
  },
  icnomeItem: {
    color: theme.green,
    backgroundColor: theme.white,
    borderRadius: 20,
    marginBottom: 5,
  },
  outcomeItem: {
    color: theme.red,
    backgroundColor: theme.white,
    borderRadius: 20,
    marginBottom: 5,
  },
  incomeAvatar: {
    backgroundColor: theme.green,
  },
  outcomeAvatar: {
    backgroundColor: theme.red,
  },
  incomeIcon: {
    color: theme.green,
  },
  outcomeIcon: {
    color: theme.red,
  },
}));

export default function TransactionItem({
  header,
  icon,
  transactionList,
  sortBy,
  type,
}) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const getSubField = (transaction) => {
    if (sortBy === "category")
      return moment(transaction.date).format("dddd, MMMM Do YYYY");
    return transaction.category;
  };

  const getSum = (transactionItem) => {
    var _ = require("lodash");
    return _.sumBy(transactionItem, "value");
  };

  return (
    <>
      <ListItem
        key={header + type}
        className={type === "INCOME" ? classes.icnomeItem : classes.outcomeItem}
        button
        onClick={() => setOpen(!open)}
      >
        <ListItemAvatar>
          <Avatar
            className={
              type === "INCOME" ? classes.incomeAvatar : classes.outcomeAvatar
            }
            variant="rounded"
          >
            {icon}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={header}
          secondary={`Transactions: ${transactionList?.length}`}
        />
        <ListItemText
          className={classes.transactionSubItem}
          primary={`${getSum(transactionList)} zł`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {transactionList.map((transaction) => (
            <ListItem key={transaction.id} className={classes.nested}>
              <ListItemIcon>
                <FiberManualRecordIcon
                  fontSize="small"
                  className={
                    type === "INCOME" ? classes.incomeIcon : classes.outcomeIcon
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={`${transaction.value} zł`}
                secondary={transaction.note}
              />
              <ListItemText
                className={classes.transactionSubItem}
                secondary={getSubField(transaction)}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
