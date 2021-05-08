import { createContext, useContext, useEffect, useState } from "react";
import { useAccountList } from "./AccountListProvider";
import axios from "../axios-instance";

const TransactionListContext = createContext();
export default function TransactionListProvider({ children }) {
  const [transactionList, setTransactionList] = useState([]);
  const { selectedAccount } = useAccountList();

  const getTransactionList = async () => {
    if (!selectedAccount) return;
    const response = await axios({
      method: "get",
      url: `api/transaction/${selectedAccount?.id}`,
    });
    if (response.status === 200) {
      setTransactionList(response.data);
    }
  };

  // eslint-disable-next-line
  useEffect(() => getTransactionList(), [selectedAccount]);

  return (
    <TransactionListContext.Provider
      value={{ transactionList, getTransactionList }}
    >
      {children}
    </TransactionListContext.Provider>
  );
}

export const useTransactionList = () => useContext(TransactionListContext);
