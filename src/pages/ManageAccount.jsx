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
import PageTitle from "../components/PageTitle";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";

export default function ManageAccount() {
  return (
    <Container maxWidth="xs">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <PageTitle title="Manage accounts" />
        </Grid>
        <Grid item>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
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
          <Button variant="contained" color="primary" fullWidth={true}>
            Add account
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
