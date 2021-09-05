import { useContext } from "react";
import Navigation from "../components/routes/nagivation.component";
import ApplicationChart from "../components/charts/applicationChart";
import { DashboardContext, DashboardProvider } from "../context/dashboard";

function DashboardContent(){
    const { 
        getTotalApplications, 
        getInterviews, 
        getRejectedApplications 
    } = useContext(DashboardContext);

    return(
        <div className="content">
            
            <div className="content-header-section">
                <h1 className="content-header">Overview</h1>
            </div>
    
            <div className="applications-overview">
                <div className="application-card">
                    <div className="mt-2">
                        <h1 className="application-card-title">Total applications</h1>
                        <h1 className="application-card-data">{ getTotalApplications() }</h1>
                    </div>              
                </div>
    
                <div className="application-card">
                    <div className="mt-2">
                        <h1 className="application-card-title">Interviews</h1>
                        <h1 className="application-card-data">{ getInterviews() }</h1>
                    </div>              
                </div>
    
                <div className="application-card">
                    <div className="mt-2">
                        <h1 className="application-card-title">Rejected Applications</h1>
                        <h1 className="application-card-data">{ getRejectedApplications() }</h1>
                    </div>              
                </div>
            </div>
    
            <div className="widget-area">
                <div className="widget-chart">
                    <div className="widget-chart-tools-area">
                        <div className="widget-chart-title">
                            <h1 className="widget-chart-title-content">Applications Overview</h1>
                        </div>
                    </div>

                    <div className="widget-chart-area">
                        <ApplicationChart/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Dashbaord(){
    return (
        <DashboardProvider>
            <div className='dashboard'>
                <Navigation/>
                <DashboardContent/>
            </div>
        </DashboardProvider>
    )
}