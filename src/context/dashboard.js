import { createContext, useEffect, useState } from "react";
import { useStore } from "../store/store";

const DashboardContext = createContext(null);

function DashboardProvider({ children }){

    const user = useStore(state => state.about);
    const { applications } = user;

    function getTotalApplications(){
        return applications.length;
    }

    function getApplicationsProcessedToday(){
        return 0;
    }

    function getRejectedApplications(){
        let rejectedApplications = 0;

        applications.forEach(application => {
            if (application.progress === "Rejected"){
                rejectedApplications += 1;
            }

        });

        return rejectedApplications;
    }

    useEffect(() => {

    }, []);

    return (
        <DashboardContext.Provider value= {{ 
            getTotalApplications,
            getApplicationsProcessedToday,
            getRejectedApplications
        }}>
            { children }
        </DashboardContext.Provider>
    )
}

export { DashboardProvider, DashboardContext }