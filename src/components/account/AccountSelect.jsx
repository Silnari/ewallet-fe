import { MenuItem, Select } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useAccountList } from "../../providers/AccountListProvider";

const AccountPicker = styled(Select)({
  maxHeight: 50,
  minWidth: 162,
  maxWidth: 162,
  marginLeft: -20,
  marginRight: 20,
  backgroundColor: "#fff",
});

export default function AccountSelect() {
  const { accountList, selectedAccount, setSelectedById } = useAccountList();

  const handleSelectedAccountChange = (event) => {
    setSelectedById(event.target.value);
  };

  return (
    <AccountPicker
      variant="outlined"
      value={selectedAccount.id}
      onChange={handleSelectedAccountChange}
    >
      {accountList.map((account) => (
        <MenuItem key={account.id} value={account.id}>
          {account.name}
        </MenuItem>
      ))}
    </AccountPicker>
  );
}
