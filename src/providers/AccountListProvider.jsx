import { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios-instance";
import { useAuth } from "./AuthProvider";

const AccountListContext = createContext();
export default function AccountListProvider({ children }) {
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { token } = useAuth();

  const getAccountList = async () => {
    const response = await axios({
      method: "get",
      url: `api/account/${token}`,
    });
    if (response.status === 200) {
      setAccountList(response.data);
      return response.data;
    }
  };

  useEffect(() => {
    setSelectedAccount(getAccountList()[0]);
    // eslint-disable-next-line
  }, []);

  const setSelectedById = (id) => {
    setSelectedAccount(accountList.find((account) => account.id === id));
  };

  return (
    <AccountListContext.Provider
      value={{
        accountList,
        getAccountList,
        selectedAccount,
        setSelectedById,
      }}
    >
      {children}
    </AccountListContext.Provider>
  );
}

export const useAccountList = () => useContext(AccountListContext);
