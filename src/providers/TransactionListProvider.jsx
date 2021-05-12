import { createContext, useContext, useEffect, useState } from "react";
import { useAccountList } from "./AccountListProvider";
import axios from "../axios-instance";

const TransactionListContext = createContext();
export default function TransactionListProvider({ children }) {
  const [transactionList, setTransactionList] = useState([]);
  const { selectedAccount } = useAccountList();

  const getTransactionList = async () => {
    if (!selectedAccount) return;
    const transactionsResponse = await axios({
      method: "get",
      url: `api/transaction/${selectedAccount?.id}`,
    });

    const incomeResponse = await axios({
      method: "get",
      url: `api/transfer/to/${selectedAccount.id}`,
    });

    const outcomeResponse = await axios({
      method: "get",
      url: `api/transfer/from/${selectedAccount.id}`,
    });

    if (
      transactionsResponse.status === 200 &&
      incomeResponse.status === 200 &&
      outcomeResponse.status === 200
    ) {
      setTransactionList(
        transactionsResponse.data.concat(
          incomeResponse.data.map((i) => {
            i.transactionType = "TRANSFER-INCOME";
            i.category = "Transfer";
            return i;
          }),
          outcomeResponse.data.map((o) => {
            o.transactionType = "TRANSFER-OUTCOME";
            o.category = "Transfer";
            return o;
          })
        )
      );
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
