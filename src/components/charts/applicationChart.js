import {
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import { ChartProvider } from "../../context/charts";
import { useStore } from "../../context/charts";
import CalenderIcon from "../../assets/icons/calender.icon"

function CustomTooltip({ active, payload, label}){
  
  return (
    <div className="h-16 border border-gray-700 rounded bg-selectgray w-72">
      <div className="flex items-center w-full h-full date">
        <div className="flex items-center justify-center h-full ml-5 w-7">
            <CalenderIcon/>
        </div>
        <div className="flex items-center justify-center w-auto h-full ml-2">
          { payload ? <p className="text-white">{ payload.length ? payload[0].payload.date : null  }</p> : null}
        </div>
      </div>
    </div>
  )
}

function Chart() {
  const currentData = useStore(state => state.data.current);

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
        <YAxis dataKey="applications" axisLine={false} tickLine={false} />
        <Tooltip content={ <CustomTooltip/> } />

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


