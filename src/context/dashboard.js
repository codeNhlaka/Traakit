import { createContext, useEffect } from "react";
import { useStore } from "../store/store";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";

const DashboardContext = createContext(null);

function DashboardProvider({ children }){
    const user = useStore(state => state.about);
    const setApplicataionRecord = useStore(state  => state.setApplicationRecord);
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
    
    useEffect(() => {
        async function fetchUserApplications(){
            const applicationsList = await API.graphql({query: queries.listApplications});
            
            if (applicationsList.data.listApplications){
                
                // get applicaations
                const { items } = applicationsList.data.listApplications;
                
                // push each application to global state
                
                items.forEach(item => {
                    const { id } = item;
    
                    // check for duplicates
                    if (applications.length !== 0){
    
                        applications.forEach(currentApplication => {
                            if (currentApplication.id === id) return; 
                        });
    
                    } else {
                        // push each application record to global state;
                        return setApplicataionRecord(item);
                    }
                })
            }
        }

        if (!applications.length){
            fetchUserApplications();
            return;
        }

    }, [applications, setApplicataionRecord]);

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