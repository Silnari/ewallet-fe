import { Button, Container, Grid } from "@material-ui/core";
import PageTitle from "../components/core/PageTitle";
import { useState } from "react";
import AddAccountDialog from "../components/manageAccount/AddAccountDialog";
import AccountList from "../components/manageAccount/AccountList";
import { useAccountList } from "../providers/AccountListProvider";
import Loading from "../components/core/Loading";

export default function ManageAccount() {
  const { isAccountLoading } = useAccountList();
  const [addAccountOpen, setAddAccountOpen] = useState(false);

  return (
    <Container maxWidth="sm">
      <Grid container align="center" direction="column" spacing={3}>
        <Grid item>
          <PageTitle title="Manage accounts" />
        </Grid>
        <Grid item>{isAccountLoading ? <Loading /> : <AccountList />}</Grid>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => setAddAccountOpen(true)}
          >
            Add account
          </Button>
        </Grid>
      </Grid>
      <AddAccountDialog open={addAccountOpen} setOpen={setAddAccountOpen} />
    </Container>
  );
}
