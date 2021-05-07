import { createContext, useContext, useState } from "react";
import axios from "../axios-instance";
import { useAuth } from "./AuthProvider";

const AccountListContext = createContext({ accountList: [] });
export default function AccountListProvider({ children }) {
  const [accountList, setAccountList] = useState([]);
  const { token } = useAuth();

  const getAccountList = async () => {
    const response = await axios({
      method: "get",
      url: `api/account/${token}`,
    });
    if (response.status === 200) {
      setAccountList(response.data);
    }
  };

  return (
    <AccountListContext.Provider value={{ accountList, getAccountList }}>
      {children}
    </AccountListContext.Provider>
  );
}

export const useAccountList = () => useContext(AccountListContext);
