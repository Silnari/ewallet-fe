import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./providers/AuthProvider";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import Account from "./pages/Account";
import AccountStats from "./pages/AccountStats";
import ManageAccount from "./pages/ManageAccount";
import AccountListProvider from "./providers/AccountListProvider";
import TransactionListProvider from "./providers/TransactionListProvider";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HeadLayout from "./components/core/layout/HeadLayout";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#85bb65",
    },
    secondary: {
      main: "#cdb68e",
    },
    background: {
      default: "#fafafa",
    },
  },
  white: "#fff",
  black: "#000",
  green: green[500],
  red: red[500],
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 60,
  },
}));

const pages = {
  account: {
    icon: <LocalAtmIcon />,
    title: "Account page",
  },
  accountStats: {
    icon: <AssessmentIcon />,
    title: "Account stats",
  },
  manageAccount: {
    icon: <AccountBalanceWalletIcon />,
    title: "Manage accounts",
  },
};

function App() {
  const { token } = useAuth();
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {token ? (
          <AccountListProvider>
            <TransactionListProvider>
              <div className={classes.root}>
                <HeadLayout navItems={pages} />
                <div className={classes.content}>
                  <Route path="/account">
                    <Account />
                  </Route>
                  <Route path="/accountStats">
                    <AccountStats />
                  </Route>
                  <Route path="/manageAccount">
                    <ManageAccount />
                  </Route>
                  <Route strict exact path="/">
                    <Redirect to="/account" />
                  </Route>
                </div>
              </div>
            </TransactionListProvider>
          </AccountListProvider>
        ) : (
          <>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route strict exact path="/">
              <Redirect to="/login" />
            </Route>
          </>
        )}
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
