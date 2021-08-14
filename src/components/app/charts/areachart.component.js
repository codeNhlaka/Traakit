import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

const rangeData = [
  {
    "day": "05-01",
    "temperature": [
      -1,
      10
    ]
  },
  {
    "day": "05-02",
    "temperature": [
      2,
      15
    ]
  },
  {
    "day": "05-03",
    "temperature": [
      3,
      12
    ]
  },
  {
    "day": "05-04",
    "temperature": [
      4,
      12
    ]
  },
  {
    "day": "05-05",
    "temperature": [
      12,
      16
    ]
  },
  {
    "day": "05-06",
    "temperature": [
      5,
      16
    ]
  },
  {
    "day": "05-07",
    "temperature": [
      3,
      12
    ]
  },
  {
    "day": "05-08",
    "temperature": [
      0,
      8
    ]
  },
  {
    "day": "05-09",
    "temperature": [
      -3,
      5
    ]
  }
]

export default function AreaChartComponent(){
  return (
    <AreaChart
      width={600}
      height={300}
      data={rangeData}
      onClick={(data) => console.log(data)}
      style={
        {
          color: "black",
        }
      }

      margin={{
        top: 20, right: 20, bottom: 20, left: 0,
      }}
    >
      <XAxis dataKey="day" />
      <YAxis />
      <Area dataKey="temperature" stroke="#30cf43" fill="#30cf43" />
      <Tooltip />
    </AreaChart>
  )
}