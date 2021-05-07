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
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { green, grey, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  transactionSubItem: {
    textAlign: "right",
  },
  transactionItem: {
    backgroundColor: theme.white,
    borderRadius: 20,
    marginBottom: 5,
  },
  transactionAvatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function TransactionItem({ header, icon, transactionList }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const getColor = (transactionType) => {
    if (transactionType === "INCOME") return green[500];
    if (transactionType === "OUTCOME") return red[500];
    return grey[900];
  };

  return (
    <>
      <ListItem
        key={header}
        className={classes.transactionItem}
        button
        onClick={() => setOpen(!open)}
      >
        <ListItemAvatar>
          <Avatar className={classes.transactionAvatar} variant="rounded">
            {icon}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={header}
          secondary={`Transactions: ${transactionList?.length}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {transactionList.map((transaction) => (
            <ListItem key={transaction.id} className={classes.nested}>
              <ListItemIcon>
                <PlayArrowIcon
                  style={{ color: getColor(transaction.transactionType) }}
                />
              </ListItemIcon>
              <ListItemText
                primary={`${transaction.value} zł`}
                secondary={transaction.note}
              />
              <ListItemText
                className={classes.transactionSubItem}
                secondary={moment(transaction.date).format(
                  "dddd, MMMM Do YYYY"
                )}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
