import { Button, Container, Grid } from "@material-ui/core";
import PageTitle from "../components/core/PageTitle";
import { useEffect, useState } from "react";
import AddAccountDialog from "../components/manageAccount/AddAccountDialog";
import ModifyAccountDialog from "../components/manageAccount/ModifyAccountDialog";
import axios from "../axios-instance";
import ConfirmDialog from "../components/core/ConfirmDialog";
import { useAccountList } from "../providers/AccountListProvider";
import AccountList from "../components/manageAccount/AccountList";

export default function ManageAccount() {
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [modifyAccountOpen, setModifyAccountOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { accountList, getAccountList } = useAccountList();

  const deleteAccount = async (id) => {
    const response = await axios({
      method: "delete",
      url: `api/account/${id}`,
    });
    if (response.status === 200) {
      setDeleteAccountOpen(false);
    }
  };

  useEffect(
    () => getAccountList(),
    // eslint-disable-next-line
    [addAccountOpen, modifyAccountOpen, deleteAccountOpen]
  );

  return (
    <Container maxWidth="sm">
      <Grid container align="center" direction="column" spacing={3}>
        <Grid item>
          <PageTitle title="Manage accounts" />
        </Grid>
        <Grid item>
          <AccountList
            accountList={accountList.filter((account) => account.id !== 0)}
            setSelectedAccount={setSelectedAccount}
            setModifyAccountOpen={setModifyAccountOpen}
            setDeleteAccountOpen={setDeleteAccountOpen}
          />
        </Grid>
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
      <ModifyAccountDialog
        open={modifyAccountOpen}
        setOpen={setModifyAccountOpen}
        account={selectedAccount}
      />
      <ConfirmDialog
        open={deleteAccountOpen}
        setOpen={setDeleteAccountOpen}
        handleAction={() => deleteAccount(selectedAccount.id)}
      />
    </Container>
  );
}
