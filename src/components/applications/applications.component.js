import { useState, useContext, useEffect} from "react";
import { ApplicationsProvider, ApplicationsContext } from "../../context/applications";
import Navigation from "../routes/nagivation.component";
import ExportIcon from "../../assets/icons/export.icon";
import FilterIcon from "../../assets/icons/filter.icon";
import PlusIcon from "../../assets/icons/plus.icon";
import { applicationDetailsContext } from "../../context/appContext";
import Select from "../form/dropdown.component";
import { ContainedInputField } from "../form/input.component";
import { useStore } from "../../store/store";
import DeleteIcon from "../../assets/icons/delete.icon";

function CreateApplication({ toggleCreateApp }){
    const { createApp } = useContext(ApplicationsContext);

    const [application, setApplication] = useState({
        companyName: null,
        role: null,
        progress: "pending"
    });


    function handleChange(forInput, value){
        let property;

        if (forInput === "company name") forInput = "companyName";

        property = forInput;

        setApplication({
            ...application,
            [property] : value
        });
    }

    return (
        <div className="border border-gray-800 absolute shadow-md bg-coolgray container top-32 left-96 w-96 rounded h-64 z-50">
            <div className="mt-5 content w-full cursor-default h-72">
                <ContainedInputField 
                    handleChange={ handleChange } 
                    placeholder="Google"
                    inputLabel="Company Name"
                />

                <ContainedInputField 
                    handleChange={ handleChange } 
                    placeholder="Software Engineer"
                    inputLabel="Role"
                />

                <button 
                        style={
                            {
                                width: '80%',
                                marginLeft: '10%',
                                marginTop: '2%'
                            }
                        } 
                        onClick={ ()=> {
                            createApp(application) 
                            toggleCreateApp();
                        }}
                        className="h-10 bg-selectgreen hover:bg-selectgreenhover transition-all rounded-md text-white cursor-pointer"
                >
                    Create Application
                </button>

            </div>
        </div>
    )
}

function ApplicationDetails({ details }){
    const { updateApp } = useContext(ApplicationsContext);

    const [applicationHistory, modifyApplicationHistory] = useState({
        companyName: details.details.company,
        Progress: null,
        id: details.details.id,
        role: details.details.role
    });

    const [applicationProgress] = useState({
        pending: "Pending",
        rejected: "Rejected",
        offer: "Offer",
        interview: "Interview"
    });

    const toggleApplicationDetails = useContext(applicationDetailsContext);

    function updateApplicationHistory(){
        if (applicationHistory.companyName && applicationHistory.Progress){
            updateApp(applicationHistory);
            return toggleApplicationDetails()
        }
    }

    function handleChange(forInput, value){
        let property;

        if (forInput === "company name") forInput = "companyName";
        
        forInput.toLocaleLowerCase();
        value.toLocaleLowerCase();
        
        property = forInput;

        modifyApplicationHistory({
            ...applicationHistory,
            [property] : value
        });
    }

    return (
        <div 
            className=" select-none border border-gray-800 absolute shadow-md bg-coolgray container top-32 left-96 w-96 rounded h-1/2 z-50">
            <div className="options w-full h-8 text-white mt-5">
                <p 
                    className="float-right mr-5 cursor-pointer text-sm text-gray-400" 
                    onClick={() => toggleApplicationDetails()}
                > 
                    close
                </p>
            </div>
            <div className="content w-full cursor-default h-72">

                <ContainedInputField 
                    disabled={ true }
                    handleChange={ handleChange } 
                    placeholder={ details.details.company }
                    inputLabel="Company Name"
                />

                <div 
                    style={ {
                    position: 'relative',
                    left: '10%',
                    height: '80px'
                    }}
                    className="company-name w-4/5 mt-2 flex"
                >
                    <div className="w-full ">
                        <p className="text-gray-400 text-sm">Progress</p>
                     
                        <Select handleChange={ handleChange } category="Progress" value={ applicationProgress[details.details.progress] }/>
                    </div>
                </div>
                <button 
                        style={
                            {
                                width: '80%',
                                marginLeft: '10%',
                                marginTop: '2%'
                            }
                        } 
                        onClick={ ()=> updateApplicationHistory() }
                        className="h-10 bg-selectgreen hover:bg-selectgreenhover transition-all rounded-md text-white cursor-pointer"
                >
                    Update Application
                </button>
            </div>
        </div>
    )
}

function Tools({ toggleCreateApp }){

    return (
        <div className="component-title relative flex items-center w-full h-10 mt-3">
            <div className="cursor-pointer hover:bg-selectgreenhover transition-all flex items-center justify-center w-12 h-full ml-2">
                <ExportIcon/>
            </div>
            <div onClick={ () => toggleCreateApp() } className="cursor-pointer rounded-md hover:bg-selectgreenhover transition-all w-40 h-full ml-2 flex items-center">
                <div className="w-9 h-5/6 ml-2 flex justify-center items-center">
                    <PlusIcon/>
                </div>
                <p className="text-white select-none">Application</p>
            </div>
        </div>
    )
}

// ui

function TableHero(){
    return (
        <div className="component-table-content uppercase text-sm sticky border-b border-gray-800 select-none flex items-center overflow-hidden bg-coolgray w-full h-10">
        <div className="w-40 ml-5 flex items-center h-full">
            <p1 className="text-gray-600">Company</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">Role</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">Progress</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">Time</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">Date</p1>
        </div>
    </div>
    )
}

function TableList(props){
    const toggleApplicationDetails = useContext(applicationDetailsContext);
    const { deleteApp } = useContext(ApplicationsContext);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {

        function formatDate(date){
            const createAt = date.split("T");
            const fdate = createAt[0];
            const ftime = createAt[1].split(".")[0];

            return { fdate, ftime };
        }

        // format date 
        const createdAt = formatDate(props.date);

        // update state

        setDate(createdAt.fdate);
        setTime(createdAt.ftime);
    }, []);

    return (
        <div className="component-table-content-details cursor-pointer text-sm relative select-none flex items-center overflow-hidden transition-all hover:bg-coolgray w-full h-12">
        <div onClick={() => toggleApplicationDetails({details: props}) } className="w-40 ml-5 flex items-center h-full">
            <p1 className="text-gray-600">{ props.company }</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="p-1 text-gray-600">{ props.role }</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">{ props.progress }</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">{ date }</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">{ time }</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <div onClick={() => deleteApp(props.id) } className="w-1/2 h-full hover:bg-rose flex justify-center items-center">
                <DeleteIcon/>
            </div>
        </div>
    </div>
    )
}


function TableComponent(){
    const user = useStore(state => state.about);
    const { applications } = user;

    const [applicationRecord ] = useState({
        companyName: "SovTech",
        role: "Graphic Designer",
        progress: "pending"
    });

    return (
        <div className="component-table relative w-full h-4/6 mt-3">
            <TableHero/>
            { applications.length ? applications.map(application => {
                return <TableList
                    company={ application.companyName }
                    role={ application.role }
                    id={ application.id }
                    progress={ application.progress }
                    date={ application.updatedAt }
                />
            }) : null }
        </div>
    )
}
const Applications = () => {
    const [applicationDetailsVisible, setApplicationVisibility] = useState(false);
    const [currentApplicationDetails, setApplicationDetails] = useState("")
    const [createApp, setCreateApp] = useState(false);

    function toggleCreateApp(){
        return setCreateApp(!createApp);
    }

    function toggleApplicationDetails(info){
        setApplicationDetails(info);
        return setApplicationVisibility(!applicationDetailsVisible);
    }

    return (
            <ApplicationsProvider>
                <div className='None:container relative overflow-hidden h-screen bg-selectgray'>
                    <Navigation/>
                    <applicationDetailsContext.Provider value={ toggleApplicationDetails }>
                    <div style={
                            {left: '20%'}
                        } 
                        className="container absolute w-4/5 h-full">
                        <div className="component-title relative flex items-center w-full h-16 mt-10">
                            <h1 className="text-white w-auto pointer-events-none select-none ml-5 text-4xl">Your applications</h1>
                        </div>
                        <Tools toggleCreateApp={ toggleCreateApp }/>
                        { applicationDetailsVisible ? <ApplicationDetails details={ currentApplicationDetails } /> : null}
                        <TableComponent/>
                        { createApp ?  <CreateApplication toggleCreateApp={ toggleCreateApp }/> : null}
                    </div>
                    </applicationDetailsContext.Provider>
                </div>
            </ApplicationsProvider>
        );
}


export default Applications;