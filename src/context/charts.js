import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import dateFormat from "dateformat";
import { API } from "aws-amplify";
import { listApplicationChartRecords } from "../graphql/queries";
import create from "zustand";

const initialState = {
    current: []
}

export const useStore = create(set => ({
    data: initialState,
    setData: (data) => set(state => ({
        data: {
            current: data
        }
    }))
}));

const ChartContext = createContext(null);

function ChartProvider({ children }){
    const [ chartInfo ] = useState([]);
    const setData = useStore(state => state.setData);

    const len = (arr) => arr.length;
    const schemaMap = useMemo(() => [], []);

    const createData = useCallback((items, month) => {
        if (!len(items)) return setData([]);
        items.forEach(item => {
            const { year, day, applicationDate } = item;
            const itemStructure = {
                [year]: {}
            }

            // define year

            if (!len(schemaMap)) schemaMap.push(itemStructure);
            else {

                for(let i = 0; i <= schemaMap.length - 1; i++){
                    let structure = {
                        [year]: {}
                    }
                    
                    if (!schemaMap[i][year]) schemaMap.push(structure);
                    else break;
                }

            }

            // define month

            for(let i = 0; i <= len(schemaMap) -1; i++){
                if (schemaMap[i][year][month]) break;
                else {
                    // add month
                    let target = schemaMap[i][year];
                    target[month] = {}
                }
            }

            // define day

            for(let i = 0; i <= len(schemaMap) -1; i++){
                if (schemaMap[i][year][month][day]) break;
                else {
                    // add month
                    let target = schemaMap[i][year][month];
                    target[day] = []
                    
                    const pushData = {
                        date: applicationDate,
                        applications: 0
                    }

                    target[day].push(pushData);
                }
            }

            // update data

            for(let i = 0; i <= len(schemaMap) - 1; i++){
                if (schemaMap[i][year][month][day]){
                    // set target
                    const target = schemaMap[i][year][month][day]
                    target[0].applications = target[0].applications + 1;
                } 
            }

        });

        const targ = schemaMap[0][2021][month]

        for(let i = 0; i <= 31; i++){
            if (targ[i]){
                let pushData = {
                    date: targ[i][0].date,
                    applications: targ[i][0].applications
                }

                chartInfo.push(pushData)
            }
        }

        setData(chartInfo);
    }, [setData, schemaMap, chartInfo]);

    function getData(year, month){
        if(!len(schemaMap)){
            try {
                byMonth(month);
            } catch(error){
                console.log(error);
            }
        }

        return schemaMap[year][month]
    }

    async function byYear(year, month){
        let filter = {
            year: {
                eq: year
            },
            month: {
                eq: month
            }
        };

        const result = await API.graphql({query: listApplicationChartRecords, variables: { filter: filter }});
        if (result.data.listApplicationChartRecords){
            const { listApplicationChartRecords } = result.data;
            console.log(listApplicationChartRecords.items);
        }
    }

    const byMonth = useCallback(async (month) => {
        let filter = {
            month: {
                eq: month 
            }
        };

        const result = await API.graphql({query: listApplicationChartRecords, variables: { filter: filter }});
        
        if (result.data.listApplicationChartRecords){
            const { items } = result.data.listApplicationChartRecords;
            createData(items, month);
        }
    }, [createData]);

    useEffect(() => {
        const month = dateFormat(new Date(), "mmmm");
        byMonth(month);
    }, [byMonth]);

    return (
        <ChartContext.Provider value={{ byYear, byMonth, getData }}>
            { children }
        </ChartContext.Provider>
    )
}

export { ChartProvider, ChartContext }