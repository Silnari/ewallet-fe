import {
  amber,
  blue,
  deepOrange,
  green,
  indigo,
  lightGreen,
  pink,
  purple,
  red,
  teal,
} from "@material-ui/core/colors";
import { useCallback, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { useTransactionList } from "../../providers/TransactionListProvider";
import {
  filterTransactionsByDate,
  groupByCategory,
} from "../../utils/transactionUtil";

const COLORS = [
  red[500],
  pink[500],
  purple[500],
  indigo[500],
  blue[500],
  teal[500],
  lightGreen[500],
  green[500],
  amber[500],
  deepOrange[500],
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontWeight="bold"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}zł`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function AccountChart({ date, periodOfTime }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const { transactionList } = useTransactionList();
  const data = groupByCategory(
    filterTransactionsByDate(transactionList, date, periodOfTime)
  );

  console.log(
    groupByCategory(
      filterTransactionsByDate(transactionList, date, periodOfTime)
    )
  );
  return (
    <PieChart width={500} height={350}>
      <Pie
        data={data}
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        dataKey="value"
        innerRadius={75}
        outerRadius={125}
        onMouseEnter={onPieEnter}
        paddingAngle={1}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
