import { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios-instance";
import { useAuth } from "./AuthProvider";

const AccountListContext = createContext();
export default function AccountListProvider({ children }) {
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { token } = useAuth();

  const getAccountListAndSetSelected = async () => {
    setIsAccountLoading(true);
    const response = await axios({
      method: "get",
      url: `api/account/${token}`,
    });
    if (response.status === 200) {
      setAccountList(response.data);
      setSelectedAccount(response.data[0]);
      setIsAccountLoading(false);
    }
  };

  const getAccountList = async () => {
    setIsAccountLoading(true);
    const response = await axios({
      method: "get",
      url: `api/account/${token}`,
    });
    if (response.status === 200) {
      setAccountList(response.data);
      setIsAccountLoading(false);
    }
  };

  useEffect(() => {
    getAccountListAndSetSelected();
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  useEffect(() => getAccountList(), [refreshKey]);

  const setSelectedById = (id) => {
    setSelectedAccount(accountList.find((account) => account.id === id));
  };

  return (
    <AccountListContext.Provider
      value={{
        accountList,
        selectedAccount,
        setSelectedById,
        setRefreshKey,
        isAccountLoading,
      }}
    >
      {children}
    </AccountListContext.Provider>
  );
}

export const useAccountList = () => useContext(AccountListContext);
