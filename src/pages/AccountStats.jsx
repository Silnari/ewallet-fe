import { Box, Container, Grid, styled } from "@material-ui/core";
import { useState } from "react";
import DatePicker from "../components/account/DatePicker";
import AccountChart from "../components/accountStats/AccountChart";
import CategoryList from "../components/accountStats/CategoryList";
import Loading from "../components/core/Loading";
import { useAccountList } from "../providers/AccountListProvider";
import { useTransactionList } from "../providers/TransactionListProvider";

const GraphBox = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: "8px 28px 8px 8px",
});

export default function AccountStats() {
  const [checked, setChecked] = useState([
    "Income total^INCOME",
    "Outcome total^OUTCOME",
  ]);
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
            <>
              <Grid item>
                <GraphBox>
                  <AccountChart date={date} categoryList={checked} />
                </GraphBox>
              </Grid>
              <Grid item>
                <CategoryList checked={checked} setChecked={setChecked} />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Container>
  );
}
