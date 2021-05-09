import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  accountAvatar: {
    backgroundColor: theme.green,
  },
  accountItem: {
    backgroundColor: theme.white,
    borderRadius: 20,
    marginBottom: 5,
  },
}));

export default function AccountItem({ account, handleModify, handleDelete }) {
  const classes = useStyles();
  return (
    <ListItem key={account.id} className={classes.accountItem}>
      <ListItemAvatar>
        <Avatar className={classes.accountAvatar} variant="rounded">
          <AccountBalanceWalletIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={account.name}
        secondary={`Start balance: ${account.startBalance}`}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => handleModify(account)}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(account)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
