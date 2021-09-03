import { useContext, useState , useEffect} from "react";
import {
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import { ChartProvider, ChartContext } from "../../context/charts";
import { useStore } from "../../context/charts";
import CalenderIcon from "../../assets/icons/calender.icon"

function CustomTooltip({ active, payload, label}){
<<<<<<< HEAD
  
=======

>>>>>>> 48b786fec520523fb918a2f1a2d7f487b0ff3d7d
  return (
    <div className="bg-selectgray w-72 h-16 border border-gray-700 rounded">
      <div className="date flex items-center w-full h-full">
        <div className="h-full w-7 ml-5 flex justify-center items-center">
            <CalenderIcon/>
        </div>
        <div className="h-full w-auto ml-2 flex justify-center items-center">
          { payload ? <p className="text-white">{ payload.length ? payload[0].payload.date : null  }</p> : null}
        </div>
      </div>
    </div>
  )
}

function Chart() {
  const currentData = useStore(state => state.data.current);
<<<<<<< HEAD
  const { byMonth, getData } = useContext(ChartContext);
  console.log(currentData, ' uooooo ')
=======
>>>>>>> 48b786fec520523fb918a2f1a2d7f487b0ff3d7d

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


