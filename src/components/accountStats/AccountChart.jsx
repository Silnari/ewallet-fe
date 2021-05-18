import { green, red } from "@material-ui/core/colors";
import {
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAccountList } from "../../providers/AccountListProvider";
import { useTransactionList } from "../../providers/TransactionListProvider";
import {
  groupByMonth,
  filterTransactionsByDate,
} from "../../utils/transactionUtil";

export default function AccountChart({ date, categoryList }) {
  const { setSelectedById } = useAccountList();
  const { transactionList } = useTransactionList();
  setSelectedById(0);

  let incomeColor = 700;
  const getIncomeColor = () => {
    const color = green[incomeColor];
    incomeColor += 100;
    if (incomeColor === 800) incomeColor = 300;
    return color;
  };

  let outcomeColor = 700;
  const getOutcomeColor = () => {
    const color = red[outcomeColor];
    outcomeColor += 100;
    if (outcomeColor === 800) outcomeColor = 300;
    return color;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={groupByMonth(
          filterTransactionsByDate(transactionList, date, "y"),
          categoryList.map((c) => c.split("^")[0])
        )}
      >
        {categoryList.map((categoryStr) => {
          const categoryArr = categoryStr.split("^");
          return (
            <Line
              key={categoryStr}
              name={categoryArr[0]}
              type="monotone"
              strokeWidth={6}
              dataKey={categoryArr[0]}
              stroke={
                categoryArr[1] === "INCOME"
                  ? getIncomeColor()
                  : getOutcomeColor()
              }
            />
          );
        })}
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
      </LineChart>
    </ResponsiveContainer>
  );
}
