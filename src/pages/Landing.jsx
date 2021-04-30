import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import HeadLayout from "../components/core/layout/HeadLayout";
import Account from "./Account";
import ManageAccount from "./ManageAccount";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

const pages = {
  account: {
    body: <Account />,
    icon: <LocalAtmIcon />,
    title: "Account page",
  },
  manageAccount: {
    body: <ManageAccount />,
    icon: <AccountBalanceWalletIcon />,
    title: "Manage accounts",
  },
};

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

export default function Landing() {
  const [activePage, setActivePage] = useState("account");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeadLayout
        navItems={pages}
        currentNavItem={activePage}
        setCurrentNavItem={setActivePage}
      />
      <main className={classes.content}>{pages[activePage].body}</main>
    </div>
  );
}
