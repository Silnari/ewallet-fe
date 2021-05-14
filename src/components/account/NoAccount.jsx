import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tabName: {
    color: theme.green,
  },
  infoBox: {
    border: "2px solid",
    borderRadius: 10,
    padding: 15,
    borderColor: theme.green,
    backgroundColor: theme.white,
  },
}));

const goToAccounts = () => {};

export default function NoAccount() {
  const classes = useStyles();

  return (
    <Box mt={2} className={classes.infoBox}>
      <InfoIcon fontSize="large" className={classes.tabName} />
      <Typography variant="h6">
        Please add your first account in{" "}
        <Link className={classes.tabName} onClick={goToAccounts()}>
          Manage accounts
        </Link>{" "}
        tab
      </Typography>
    </Box>
  );
}
