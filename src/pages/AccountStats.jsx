import { Container, Grid } from "@material-ui/core";
import { useState } from "react";
import DatePicker from "../components/account/DatePicker";
import AccountChart from "../components/accountStats/AccountChart";
import Loading from "../components/core/Loading";
import { useAccountList } from "../providers/AccountListProvider";
import { useTransactionList } from "../providers/TransactionListProvider";

export default function AccountStats() {
  const [date, setDate] = useState(new Date());
  const { selectedAccount } = useAccountList();
  const { isTransactionLoading } = useTransactionList();

  return (
    <Container maxWidth="md">
      {!selectedAccount ? (
        <Loading />
      ) : (
        <Grid container align="center" direction="column" spacing={2}>
          <Grid item>
            <DatePicker date={date} setDate={setDate} periodOfTime={"y"} />
          </Grid>
          {isTransactionLoading ? (
            <Loading />
          ) : (
            <Grid item>
              <AccountChart date={date} />
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}
