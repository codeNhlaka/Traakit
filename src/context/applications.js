import { createContext, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { createApplication, deleteApplication, updateApplication, createApplicationChartRecord } from "../graphql/mutations";
import { useStore } from "../store/store";
import dateFormat from "dateformat";
import * as queries from "../graphql/queries";

const ApplicationsContext = createContext(null);

function ApplicationsProvider({ children }){
    const user = useStore(state => state.about);
    const { applications } = user;
    const setApplicataionRecord = useStore(state  => state.setApplicationRecord);
    const deleteApplicationRecord = useStore(state => state.deleteApplicationRecord);

    async function createApp(applicationRecord){

        // create id
        const id = uuidv4();

        // add id to data received as args...

        const modifiedRecord = Object.assign(applicationRecord, {
            ...applicationRecord,
            id
        });

        // create application record in db
        const createRecord = await API.graphql({query: createApplication, variables: {input: modifiedRecord}})

        if (createRecord.data.createApplication){
            const { createApplication } = createRecord.data;

            // update the chart record 
            try {

                const date = new Date();

                const applicationId = createApplication.id;
                const applicationDate = dateFormat(date, "dddd, mmmm d, yyyy");
                const month = dateFormat(date, "mmmm");
                const year = parseInt(dateFormat(date, "yyyy"));
                const day = date.getDate();

                const data = {
                    applicationId,
                    applicationDate,
                    month,
                    year,
                    day
                }

                await API.graphql({query: createApplicationChartRecord, variables: { input: data }})
            
            } catch(error){
                console.log(error);
            }
            // update global state
            return setApplicataionRecord(createApplication);
        }
    }
    
    async function deleteApp(id){
        // delete application record from db
        const deleteRecord = await API.graphql({query: deleteApplication, variables: {input : { id } }})
        
        if (deleteRecord.data.deleteApplication){
            // update state
            return deleteApplicationRecord(id);
        }
    }

    async function updateApp(data){

        // modify data

        const modifiedData = {
            id: data.id,
            companyName: data.companyName,
            role: data.role,
            progress: data.Progress
        }

        // update application in db

        const updateApplicationRecord = await API.graphql({query: updateApplication, variables: { input: modifiedData }})
        if (updateApplicationRecord.data.updateApplication){
            const { updateApplication } = updateApplicationRecord.data;
            const { id } = updateApplication;
            deleteApplicationRecord(id);
            setApplicataionRecord( updateApplication );
        }
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
        }
    }, [])

    return (
        <ApplicationsContext.Provider value={{createApp, deleteApp, updateApp }}>
            { children }
        </ApplicationsContext.Provider>
    )
}

export { ApplicationsProvider, ApplicationsContext }