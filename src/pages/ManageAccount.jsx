import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import PageTitle from "../components/core/PageTitle";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import AddAccountDialog from "../components/core/dialog/AddAccountDialog";
import ModifyAccountDialog from "../components/core/dialog/ModifyAccountDialog";
import axios from "../axios-instance";
import { useAuth } from "../providers/AuthProvider";
import ConfirmDialog from "../components/core/dialog/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  accountAvatar: {
    backgroundColor: green[500],
  },
  accountItem: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 5,
  },
}));

export default function ManageAccount() {
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [modifyAccountOpen, setModifyAccountOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountList, setAccountList] = useState([]);
  const classes = useStyles();
  const { token } = useAuth();

  const getAccountList = async () => {
    const response = await axios({
      method: "get",
      url: `api/account/${token}`,
    });
    if (response.status === 200) {
      setAccountList(response.data);
    }
  };

  const deleteAccount = async (id) => {
    const response = await axios({
      method: "delete",
      url: `api/account/${id}`,
    });
    if (response.status === 200) {
      setDeleteAccountOpen(false);
    }
  };

  useEffect(() => {
    getAccountList();
    // eslint-disable-next-line
  }, [addAccountOpen, modifyAccountOpen, deleteAccountOpen]);

  const handleModifyAccount = (account) => {
    setSelectedAccount(account);
    setModifyAccountOpen(true);
  };

  const handleDeleteAccount = (account) => {
    setSelectedAccount(account);
    setDeleteAccountOpen(true);
  };
  return (
    <Container maxWidth="sm">
      <Grid container align="center" direction="column" spacing={3}>
        <Grid item>
          <PageTitle title="Manage accounts" />
        </Grid>
        <Grid item>
          <List>
            {accountList.map((account) => {
              return (
                <ListItem className={classes.accountItem} key={account.id}>
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
                      onClick={() => handleModifyAccount(account)}
                    >
                      <SettingsIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteAccount(account)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => setAddAccountOpen(true)}
          >
            Add account
          </Button>
        </Grid>
      </Grid>
      <AddAccountDialog open={addAccountOpen} setOpen={setAddAccountOpen} />
      <ModifyAccountDialog
        open={modifyAccountOpen}
        setOpen={setModifyAccountOpen}
        account={selectedAccount}
      />
      <ConfirmDialog
        open={deleteAccountOpen}
        setOpen={setDeleteAccountOpen}
        handleAction={() => deleteAccount(selectedAccount.id)}
      />
    </Container>
  );
}
