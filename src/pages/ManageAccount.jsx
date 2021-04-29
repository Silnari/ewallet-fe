import {
  Avatar,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import PageTitle from "../components/PageTitle";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import { useState } from "react";
import AddAccountDialog from "../components/AddAccountDialog";

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
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container align="center" direction="column" spacing={3}>
        <Grid item>
          <PageTitle title="Manage accounts" />
        </Grid>
        <Grid item>
          <List>
            <ListItem className={classes.accountItem}>
              <ListItemAvatar>
                <Avatar className={classes.accountAvatar} variant="rounded">
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Gotówka"
                secondary="Starting balance: 50"
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <SettingsIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.accountItem}>
              <ListItemAvatar>
                <Avatar className={classes.accountAvatar} variant="rounded">
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Karta 1"
                secondary="Starting balance: 8000"
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <SettingsIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.accountItem}>
              <ListItemAvatar>
                <Avatar className={classes.accountAvatar} variant="rounded">
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Karta 2"
                secondary="Starting balance: 5000"
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <SettingsIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
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
    </Container>
  );
}
