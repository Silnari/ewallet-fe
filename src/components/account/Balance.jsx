import { Box, Grid, makeStyles, styled } from "@material-ui/core";
import * as balance from "../../utils/transactionUtil";
import { useTransactionList } from "../../providers/TransactionListProvider";
import { useAccountList } from "../../providers/AccountListProvider";
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
  },
  negativeBalanceBox: {
    borderColor: theme.red,
  },
}));

export default function Balance({ date, periodOfTime }) {
  const classes = useStyles();
  const { transactionList } = useTransactionList();
  const { selectedAccount } = useAccountList();

  const filteredTransactionList = balance.filterTransactionsByDate(
    transactionList,
    date,
    periodOfTime
  );

  return (
    <Box>
      <Grid container alignItems="center" direction="column" spacing={1}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <BalanceBox
                className={`${classes.positiveBalanceBox} ${classes.positiveBalance}`}
              >
                {balance.getIncomeSum(filteredTransactionList)} zł
              </BalanceBox>
            </Grid>
            <Grid item>
              <BalanceBox
                className={`${classes.negativeBalanceBox} ${classes.negativeBalance}`}
              >
                {balance.getOutcomeSum(filteredTransactionList)} zł
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
                color={
                  balance.getSum(filteredTransactionList) > 0 ? "green" : "red"
                }
              >
                {balance.getSum(filteredTransactionList)} zł
              </LabelledOutline>
            </Grid>
            <Grid item>
              <LabelledOutline
                id="account"
                label="Account"
                color={
                  balance.getAccountBalance(
                    selectedAccount.startBalance,
                    transactionList
                  ) > 0
                    ? "green"
                    : "red"
                }
              >
                {balance.getAccountBalance(
                  selectedAccount.startBalance,
                  transactionList
                )}{" "}
                zł
              </LabelledOutline>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
