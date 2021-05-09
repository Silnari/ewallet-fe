import { List } from "@material-ui/core";
import AccountItem from "./AccountItem";

export default function AccountList({
  accountList,
  setSelectedAccount,
  setModifyAccountOpen,
  setDeleteAccountOpen,
}) {
  const handleModify = (account) => {
    setSelectedAccount(account);
    setModifyAccountOpen(true);
  };

  const handleDelete = (account) => {
    setSelectedAccount(account);
    setDeleteAccountOpen(true);
  };

  return (
    <List>
      {accountList.map((account) => (
        <AccountItem
          account={account}
          handleModify={handleModify}
          handleDelete={handleDelete}
        />
      ))}
    </List>
  );
}
