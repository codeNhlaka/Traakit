import { createContext, useEffect, useState } from "react";
import { useStore } from "../store/store";

const DashboardContext = createContext(null);

function DashboardProvider({ children }){

    const user = useStore(state => state.about);
    const { applications } = user;

    function getTotalApplications(){
        return applications.length;
    }

    function getInterviews(){
        let interviews = 0;

        applications.forEach(application => {
            if (application.progress === "Interview"){
                interviews += 1;
            }

        });

        return interviews;
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
            getInterviews,
            getRejectedApplications
        }}>
            { children }
        </DashboardContext.Provider>
    )
}

export { DashboardProvider, DashboardContext }