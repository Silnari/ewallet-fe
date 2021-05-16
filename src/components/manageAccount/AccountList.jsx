import { List } from "@material-ui/core";
import { useAccountList } from "../../providers/AccountListProvider";
import AccountItem from "./AccountItem";

export default function AccountList() {
  const { accountList } = useAccountList();

  return (
    <List>
      {accountList
        .filter((account) => account.id !== 0)
        .map((account) => (
          <AccountItem key={account.id} account={account} />
        ))}
    </List>
  );
}
