import { Box, Container, Grid } from "@material-ui/core";
import { useState } from "react";
import AccountSelect from "../components/account/AccountSelect";
import DatePicker from "../components/account/DatePicker";
import Loading from "../components/core/Loading";
import { useAccountList } from "../providers/AccountListProvider";

export default function AccountStats() {
  const [date, setDate] = useState(new Date());
  const [periodOfTime, setPeriodOfTime] = useState("M");
  const { selectedAccount } = useAccountList();

  return (
    <Container maxWidth="md">
      {!selectedAccount ? (
        <Loading />
      ) : (
        <Box display="flex">
          <AccountSelect />
          <Box>
            <Grid container align="center" direction="column" spacing={2}>
              <Grid item>
                <DatePicker
                  date={date}
                  setDate={setDate}
                  periodOfTime={periodOfTime}
                  setPeriodOfTime={setPeriodOfTime}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
}
