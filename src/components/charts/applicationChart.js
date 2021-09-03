import { useContext } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import { ChartProvider, ChartContext } from "../../context/charts";
import { useStore } from "../../context/charts";

function Chart() {
  const currentData = useStore(state => state.data.current);
  const { byMonth, getData } = useContext(ChartContext);

  return (
    <ResponsiveContainer width="95%" height={300}>
      <AreaChart data={currentData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#30cf43" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#30cf43" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <Area dataKey="applications" stroke="#30cf43" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}

          tickLine={false}
        />

        <YAxis dataKey="applications" axisLine={false} tickCount={8} tickLine={false} />



        <Tooltip />

        <CartesianGrid opacity="0.1" vertical={false} />

      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function ApplicationsChart(){
  return (
    <ChartProvider>
      <Chart/>
    </ChartProvider>
  )
}


{/* <defs>
<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
<stop offset="5%" stopColor="#30cf43" stopOpacity={0.8}/>
<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
</linearGradient>
<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
<stop offset="5%" stopColor="#30cf43" stopOpacity={0.2}/>
<stop offset="95%" stopColor="#30cf43" stopOpacity={0}/>
</linearGradient>
</defs> */}