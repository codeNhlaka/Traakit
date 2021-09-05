import { createContext, useEffect, useState } from "react";
import { useStore } from "../store/store";

const DashboardContext = createContext(null);

function DashboardProvider({ children }){
    const user = useStore(state => state.about);
    const { applications } = user;

    /**
     * Reads the length of `Applications` list
     * @returns length of applications list
     */
    function getTotalApplications(){
        return applications.length;
    }

    /**
     * Iterates over `Applications` list and checks for applications
     * with a progress of "Interview" and increments the interviews var
     * by value 1 when such application is met
     * @returns total number of applications with the progress "Interview"
     */
    function getInterviews(){
        let interviews = 0;

        applications.forEach(application => {
            if (application.progress === "Interview"){
                interviews += 1;
            }

        });

        return interviews;
    }

    /**
     * Iterates over `Applications` list and checks for applications
     * with a progress of "Rejected" and increments the rejectedApplications var
     * by value 1 when such application is met
     * @returns total number of applications with the progress "Rejection"
     */

    function getRejectedApplications(){
        let rejectedApplications = 0;

        applications.forEach(application => {
            if (application.progress === "Rejected"){
                rejectedApplications += 1;
            }

        });

        return rejectedApplications;
    }

    return (
        <DashboardContext.Provider value= {{ 
            getTotalApplications,
            getInterviews,
            getRejectedApplications,
        }}>
            { children }
        </DashboardContext.Provider>
    )
}

export { DashboardProvider, DashboardContext }