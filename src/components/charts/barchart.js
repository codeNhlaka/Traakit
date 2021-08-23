import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer, AreaChart, Area
} from "recharts";

const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 5000,
      "amt": 4000
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 4990,
      "pv": 7000,
      "amt": 2100
    }
  ]
  


function ApplicationsChart(){
    return (
        <ResponsiveContainer>
            <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#30cf43" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#30cf43" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#30cf43" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} />
                <YAxis axisLine={false} tickLine={8} />
                <CartesianGrid opacity={0.1} vertical={false} />
                <Tooltip />
                {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
                <Area type="monotoneX" dataKey="pv" stroke="#30cf43" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default ApplicationsChart;