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
import ModifyAccountDialog from "./ModifyAccountDialog";
import { useState } from "react";
import { useAccountList } from "../../providers/AccountListProvider";
import axios from "../../axios-instance";
import ConfirmDialog from "../core/ConfirmDialog";

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

export default function AccountItem({ account }) {
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { setRefreshKey } = useAccountList();
  const classes = useStyles();

  const deleteAccount = async (id) => {
    const response = await axios({
      method: "delete",
      url: `api/account/${id}`,
    });
    if (response.status === 200) {
      setIsDeleteDialogOpen(false);
      setRefreshKey((oldKey) => oldKey + 1);
    }
  };

  return (
    <>
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
            onClick={() => setIsModifyDialogOpen(true)}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ModifyAccountDialog
        open={isModifyDialogOpen}
        setOpen={setIsModifyDialogOpen}
        account={account}
      />
      <ConfirmDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        handleAction={() => deleteAccount(account.id)}
      />
    </>
  );
}
