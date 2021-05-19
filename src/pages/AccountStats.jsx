import { Box, Container, Grid, styled } from "@material-ui/core";
import { useState } from "react";
import DatePicker from "../components/account/DatePicker";
import AccountChart from "../components/accountStats/AccountChart";
import CategoryFilter from "../components/accountStats/CategoryFilter";
import CategoryList from "../components/accountStats/CategoryList";
import Loading from "../components/core/Loading";
import { useAccountList } from "../providers/AccountListProvider";
import { useTransactionList } from "../providers/TransactionListProvider";

const GraphBox = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: "18px 28px 8px 8px",
});

export default function AccountStats() {
  const [checked, setChecked] = useState([
    "Income total^INCOME",
    "Outcome total^OUTCOME",
  ]);
  const [date, setDate] = useState(new Date());
  const [searchCategoryText, setSearchCategoryText] = useState("");
  const { selectedAccount } = useAccountList();
  const { transactionList, isTransactionLoading } = useTransactionList();
  const categoryList = [
    "Income total^INCOME",
    "Outcome total^OUTCOME",
    ...transactionList
      .filter((t) => ["INCOME", "OUTCOME"].includes(t.transactionType))
      .map(
        (transaction) =>
          `${transaction.category}^${
            transaction.transactionType === "INCOME" ? "INCOME" : "OUTCOME"
          }`
      )
      .filter((category, index, self) => self.indexOf(category) === index),
  ];

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
                <CategoryFilter setSearchCategoryText={setSearchCategoryText} />
              </Grid>
              <Grid item>
                <CategoryList
                  searchCategoryText={searchCategoryText}
                  categoryList={categoryList}
                  checked={checked}
                  setChecked={setChecked}
                />
              </Grid>
              <Grid item />
            </>
          )}
        </Grid>
      )}
    </Container>
  );
}
