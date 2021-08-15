import Navigation from "./nagivation.component";
import AreaChartComponent from "./charts/areachart.component";
import AreaChartPrev from "./charts/areachartprev.component";

const DashboardContent = () => (
    <div style={
        {left: '20%'}
    } className="container absolute w-4/5 h-full">
        
        <div className="component-title flex items-center w-full h-16 mt-10">
            <h1 className="text-white w-auto pointer-events-none select-none ml-5 text-4xl">Overview</h1>
        </div>

        <div className="application-summery flex items-center cards w-full h-24 mt-3">
            
            <div className="card flex items-start justify-center rounded select-none bg-coolgray ml-5 w-72 h-20">
                <div className="mt-2">
                    <h1 className="text-white ml-2 top-2 w-40 overflow-hidden h-auto text-sm uppercase">Total applications</h1>
                    <h1 className="text-white top-4 w-16 text-3xl ml-2">140</h1>
                </div>              
                <div className="items-center justify-center left-44 mt-2 mini-chart w-20 h-16 ">
                    <AreaChartPrev/>
                </div>
            </div>

            <div className="card flex items-start justify-center rounded select-none bg-coolgray ml-5 w-72 h-20">
                <div className="mt-2">
                    <h1 className="text-white ml-2 top-2 w-40 overflow-hidden h-auto text-sm uppercase">Applications today</h1>
                    <h1 className="text-white top-4 w-16 text-3xl ml-2">20</h1>
                </div>              
                <div className="items-center justify-center left-44 mt-2 mini-chart w-20 h-16">
                </div>
            </div>

            <div className="card flex items-start justify-center rounded select-none bg-coolgray ml-5 w-72 h-20">
                <div className="mt-2">
                    <h1 className="text-white ml-2 top-2 w-auto overflow-hidden h-auto text-sm uppercase">Rejected Applications</h1>
                    <h1 className="text-white top-4 w-16 text-3xl ml-2">3</h1>
                </div>              
                <div className="items-center justify-center left-44 mt-2 mini-chart w-20 h-16">
                </div>
            </div>

        </div>

        <div className="w-full h-96 mt-2 flex items-center">
            <div style={{
                width: "55%"
            }} className="chart overflow-hidden h-full hover:bg-coolgray transition-all ml-5 rounded flex justify-center items-center">
                <AreaChartComponent/>
            </div>
        </div>
    </div>
);

const DashboardComponent = () => (
    <div className='None:container relative overflow-hidden h-screen bg-selectgray'>
        <Navigation/>
        <DashboardContent/>
    </div>
);


export default DashboardComponent;