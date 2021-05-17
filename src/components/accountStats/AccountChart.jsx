import { useTheme } from "@material-ui/styles";
import {
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTransactionList } from "../../providers/TransactionListProvider";
import {
  groupByMonth,
  filterTransactionsByDate,
} from "../../utils/transactionUtil";

export default function AccountChart({ date }) {
  const { transactionList } = useTransactionList();
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={groupByMonth(
          filterTransactionsByDate(transactionList, date, "y"),
          "Food"
        )}
      >
        <Line
          name="Food"
          strokeWidth={6}
          type="monotone"
          dataKey="value"
          stroke={theme.red}
        />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
      </LineChart>
    </ResponsiveContainer>
  );
}
