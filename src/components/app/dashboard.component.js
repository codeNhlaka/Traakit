import Navigation from "./nagivation.component";

const DashboardContent = () => (
    <div style={
        {left: '20%'}
    } className="container absolute w-4/5 h-full">
        <div className="component-title flex items-center w-full h-16 mt-10">
            <h1 className="text-white w-auto pointer-events-none select-none ml-5 text-4xl">Overview</h1>
        </div>
        <div className="application-summery flex items-centercards w-full h-20 mt-3">
            <div className="card rounded select-none bg-coolgray ml-5 w-72 h-20">
                <h1 className="relative text-white ml-2 top-2 w-auto h-auto text-sm uppercase">Total applications</h1>
                <h1 className="relative text-white top-4 text-3xl w-auto ml-2">140</h1>
            </div>
            <div className="card rounded select-none bg-coolgray ml-5 w-72 h-20">
                <h1 className="relative text-white ml-2 top-2 w-auto h-auto text-sm uppercase">Applications today</h1>
                <h1 className="relative text-white top-4 text-3xl w-auto ml-2">20</h1>
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