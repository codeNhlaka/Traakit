import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
  LineChart
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

const data = [
  {
    "name": "Aug 1",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Aug 7",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Aug 14",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Aug 28",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Sep 1",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Sep 7",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Sep 14",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

export default function AreaChartComponent(){
  return (
    <ResponsiveContainer
        width={600}
        height={300}
    >
    <LineChart data={data}
      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      onClick={() => alert("hi")}
      >
      <XAxis dataKey="name" axisLine={false} tickCount={8} />
      <YAxis axisLine={false} tickLine={false} tickCount={8}/>
      <Tooltip />
      <CartesianGrid opacity="0.02" vertical={false}/>
      <Legend />
      <Line type="CurveType" dataKey="pv" stroke="#30cf43" />
      <Line type="CurveType" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
    </ResponsiveContainer>
  )
}



{/* <AreaChart
data={rangeData}
onClick={(data) => console.log(data)}
style={
  {
    color: "black",
  }
}

margin={{
  top: 20, right: 20, bottom: 20, left: 20,
}}
>
<XAxis dataKey="day" />
<YAxis />
<Area dataKey="temperature" stroke="#30cf43" fill="#30cf43" />
<Tooltip />
</AreaChart> */}