import { Box, InputLabel, MenuItem, Select } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useAccountList } from "../../providers/AccountListProvider";

const AccountPicker = styled(Select)({
  maxHeight: 50,
  minWidth: 162,
  maxWidth: 162,
});

export default function AccountSelect() {
  const { accountList, selectedAccount, setSelectedById } = useAccountList();

  const handleSelectedAccountChange = (event) => {
    setSelectedById(event.target.value);
  };

  return (
    selectedAccount && (
      <Box>
        <InputLabel align="left" htmlFor="selectAccount">
          Selected account:
        </InputLabel>
        <AccountPicker
          value={selectedAccount.id}
          onChange={handleSelectedAccountChange}
          id="selectAccount"
        >
          {accountList.map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </AccountPicker>
      </Box>
    )
  );
}
