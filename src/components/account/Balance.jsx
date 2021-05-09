import { Box, Grid, makeStyles, styled } from "@material-ui/core";
import moment from "moment";
import _ from "lodash";
import LabelledOutline from "../core/LabelledOutline";

const BalanceBox = styled(Box)({
  border: "2px solid",
  borderRadius: 10,
  padding: 10,
  width: 195,
  fontWeight: "bold",
  backgroundColor: "#fff",
});

const useStyles = makeStyles((theme) => ({
  positiveBalance: {
    color: theme.green,
  },
  negativeBalance: {
    color: theme.red,
  },
  positiveBalanceBox: {
    borderColor: theme.green,
    color: theme.green,
  },
  negativeBalanceBox: {
    borderColor: theme.red,
    color: theme.red,
  },
}));

export default function Balance({
  account,
  transactionList,
  date,
  periodOfTime,
}) {
  const classes = useStyles();

  const getPeriod = () => {
    if (periodOfTime === "w") return "isoWeek";
    if (periodOfTime === "M") return "month";
    return "year";
  };

  const getTransactionSum = (transactionList) =>
    _.sum(
      transactionList.map((transaction) =>
        transaction.transactionType === "INCOME"
          ? transaction.value
          : -transaction.value
      )
    );

  const getAccountBalance = () =>
    _.round(account.startBalance + getTransactionSum(transactionList), 2);

  const filterByDate = () =>
    transactionList.filter((transaction) =>
      moment(transaction.date).isSame(moment(date), getPeriod())
    );

  const getIncomeSum = () =>
    _.sumBy(
      filterByDate().filter((t) => t.transactionType === "INCOME"),
      "value"
    );

  const getOutcomeSum = () =>
    -_.sumBy(
      filterByDate().filter((t) => t.transactionType !== "INCOME"),
      "value"
    );

  const getSum = () => getTransactionSum(filterByDate());

  return (
    <Box>
      <Grid container alignItems="center" direction="column" spacing={1}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <BalanceBox className={classes.positiveBalanceBox}>
                {getIncomeSum()} zł
              </BalanceBox>
            </Grid>
            <Grid item>
              <BalanceBox className={classes.negativeBalanceBox}>
                {getOutcomeSum()} zł
              </BalanceBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <LabelledOutline
                id="monthly"
                label="Monthly"
                color={getSum() > 0 ? "green" : "red"}
              >
                {getSum()} zł
              </LabelledOutline>
            </Grid>
            <Grid item>
              <LabelledOutline
                id="account"
                label="Account"
                color={getAccountBalance() > 0 ? "green" : "red"}
              >
                {getAccountBalance()} zł
              </LabelledOutline>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
