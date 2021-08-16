import { useState, useContext} from "react";
import Navigation from "./nagivation.component";
import ExportIcon from "../../assets/icons/export.icon";
import FilterIcon from "../../assets/icons/filter.icon";
import PlusIcon from "../../assets/icons/plus.icon";
import { applicationDetailsContext } from "../../appContext";

// tools

function TableListPrev(){
    return (
        <div className="absolute shadow-md bg-coolgray container top-56 left-96 w-96 rounded h-96 z-50">

        </div>
    )
}

function AppTools(){
    return (
        <div className="component-title relative flex items-center w-full h-10 mt-3">
            <div className="cursor-pointer hover:bg-selectgreenhover transition-all flex items-center justify-center w-12 h-full ml-5">
                <FilterIcon/>
            </div>
            <div className="cursor-pointer hover:bg-selectgreenhover transition-all flex items-center justify-center w-12 h-full ml-2">
                <ExportIcon/>
            </div>
            <div className="cursor-pointer hover:bg-selectgreenhover transition-all w-40 h-full ml-2 flex items-center">
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

function TableList(){
    const toggleApplicationDetails = useContext(applicationDetailsContext);

    return (
        <div onClick={() => toggleApplicationDetails() } className="component-table-content-details cursor-pointer text-sm relative select-none flex items-center overflow-hidden transition-all hover:bg-coolgray w-full h-12">
        <div className="w-40 ml-5 flex items-center h-full">
            <p1 className="text-gray-600">SovTech</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="p-1 text-gray-600">GR</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">Pending</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">17 Aug</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">14:43am</p1>
        </div>
    </div>
    )
}


function TableComponent(){
    return (
        <div className="component-table relative w-full h-4/6 mt-3">
            <TableHero/>
            <TableList/>
        </div>
    )
}
const ApplicationsComponent = props => {
    const [applicationDetailsVisible, setApplicationVisibility] = useState(false);

    function toggleApplicationDetails(){
        return setApplicationVisibility(!applicationDetailsVisible);
    }

    return (
            <div className='None:container relative overflow-hidden h-screen bg-selectgray'>
                <Navigation/>
                <div style={
                {left: '20%'}
                } className="container absolute w-4/5 h-full">
                    <div className="component-title relative flex items-center w-full h-16 mt-10">
                        <h1 className="text-white w-auto pointer-events-none select-none ml-5 text-4xl">Your applications</h1>
                    </div>
                    <AppTools/>
                    { applicationDetailsVisible ? <TableListPrev/> : null}
                <applicationDetailsContext.Provider value={ toggleApplicationDetails }>
                    <TableComponent/>
                </applicationDetailsContext.Provider>
                </div>
            </div>
        );
}


export default ApplicationsComponent;