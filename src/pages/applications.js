import { useState, useContext, useEffect} from "react";
import { ApplicationsProvider, ApplicationsContext } from "../context/applications";
import Navigation from "../components/routes/nagivation.component";
import ExportIcon from "../assets/icons/export.icon";
import PlusIcon from "../assets/icons/plus.icon";
import { applicationDetailsContext } from "../context/appContext";
import Select from "../components/form/dropdown.component";
import { ContainedInputField } from "../components/form/input.component";
import { useStore } from "../store/store";
import DeleteIcon from "../assets/icons/delete.icon";

function CreateApplication({ toggleCreateApp }){
    const { createApp } = useContext(ApplicationsContext);

    const [application, setApplication] = useState({
        companyName: null,
        role: null,
        progress: "Pending"
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
        <div className="container absolute z-50 h-64 border border-gray-800 rounded shadow-md bg-coolgray top-32 left-96 w-96">
            <div className="w-full mt-5 cursor-default h-72">
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
                        className="h-10 text-white transition-all rounded-md cursor-pointer bg-selectgreen hover:bg-selectgreenhover"
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
            className="container absolute z-50 border border-gray-800 rounded shadow-md select-none bg-coolgray top-32 left-96 w-96 h-1/2">
            <div className="w-full h-8 mt-5 text-white options">
                <p 
                    className="float-right mr-5 text-sm text-gray-400 cursor-pointer" 
                    onClick={() => toggleApplicationDetails()}
                > 
                    close
                </p>
            </div>
            <div className="w-full cursor-default h-72">

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
                    className="flex w-4/5 mt-2 company-name"
                >
                    <div className="w-full ">
                        <p className="text-sm text-gray-400">Progress</p>
                     
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
                        className="h-10 text-white transition-all rounded-md cursor-pointer bg-selectgreen hover:bg-selectgreenhover"
                >
                    Update Application
                </button>
            </div>
        </div>
    )
}

function Tools({ toggleCreateApp }){

    return (
        <div className="relative flex items-center w-full h-10 mt-3 component-title">
            <div className="flex items-center justify-center w-12 h-full ml-2 transition-all cursor-pointer hover:bg-selectgreenhover">
                <ExportIcon/>
            </div>
            <div onClick={ () => toggleCreateApp() } className="flex items-center w-40 h-full ml-2 transition-all rounded-md cursor-pointer hover:bg-selectgreenhover">
                <div className="flex items-center justify-center ml-2 w-9 h-5/6">
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
        <div className="sticky flex items-center w-full h-10 overflow-hidden text-sm uppercase border-b border-gray-800 select-none component-table-content bg-coolgray">
        <div className="flex items-center w-40 h-full ml-5">
            <p1 className="text-gray-600">Company</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <p1 className="text-gray-600">Role</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <p1 className="text-gray-600">Progress</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <p1 className="text-gray-600">Time</p1>
        </div>
        <div className="flex items-center w-40 h-full">
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
        <div className="relative flex items-center w-full h-12 overflow-hidden text-sm transition-all cursor-pointer select-none component-table-content-details hover:bg-coolgray">
        <div onClick={() => toggleApplicationDetails({details: props}) } className="flex items-center w-40 h-full ml-5">
            <p1 className="text-gray-600">{ props.company }</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <p1 className="p-1 text-gray-600">{ props.role }</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <p1 className="text-gray-600">{ props.progress }</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <p1 className="text-gray-600">{ date }</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <p1 className="text-gray-600">{ time }</p1>
        </div>
        <div className="flex items-center w-40 h-full">
            <div onClick={() => deleteApp(props.id) } className="flex items-center justify-center w-1/2 h-full hover:bg-rose">
                <DeleteIcon/>
            </div>
        </div>
    </div>
    )
}


function TableComponent(){
    const user = useStore(state => state.about);
    const { applications } = user;


    return (
        <div className="relative w-full mt-3 overflow-y-scroll component-table h-4/6">
            <TableHero/>
            { applications.length ? applications.map(application => {
                return <TableList
                    key={ application.id }
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
                <div className='relative h-screen overflow-hidden None:container bg-selectgray'>
                    <Navigation/>
                    <applicationDetailsContext.Provider value={ toggleApplicationDetails }>
                    <div className="container absolute w-4/5 h-full left-left-20">
                        <div className="relative flex items-center w-full h-16 mt-10 component-title">
                            <h1 className="w-auto ml-5 text-4xl text-white pointer-events-none select-none">Your applications</h1>
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