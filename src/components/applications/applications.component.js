import { useState, useContext} from "react";
import { useDrag } from "react-use-gesture";
import Navigation from "../routes/nagivation.component";
import ExportIcon from "../../assets/icons/export.icon";
import FilterIcon from "../../assets/icons/filter.icon";
import PlusIcon from "../../assets/icons/plus.icon";
import { applicationDetailsContext } from "../../context/appContext";
import Select from "../form/dropdown.component";
import InputField, { ContainedInputField } from "../form/input.component";
{/* <Select /> */}

function ApplicationDetails(){
    const toggleApplicationDetails = useContext(applicationDetailsContext);

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
                <ContainedInputField/>
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
                        <Select />
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
                        onClick={ ()=> alert('Processing...')}
                        className="h-10 bg-selectgreen hover:bg-selectgreenhover transition-all rounded-md text-white cursor-pointer"
                >
                    Update Application
                </button>
            </div>
        </div>
    )
}

function Tools(){
    return (
        <div className="component-title relative flex items-center w-full h-10 mt-3">
            <div className="cursor-pointer hover:bg-selectgreenhover transition-all flex items-center justify-center w-12 h-full ml-5">
                <FilterIcon/>
            </div>
            <div className="cursor-pointer hover:bg-selectgreenhover transition-all flex items-center justify-center w-12 h-full ml-2">
                <ExportIcon/>
            </div>
            <div className="cursor-pointer rounded-md hover:bg-selectgreenhover transition-all w-40 h-full ml-2 flex items-center">
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
const Applications = props => {
    const [applicationDetailsVisible, setApplicationVisibility] = useState(false);

    function toggleApplicationDetails(){
        return setApplicationVisibility(!applicationDetailsVisible);
    }

    return (
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
                    <Tools/>
                    { applicationDetailsVisible ? <ApplicationDetails/> : null}
                    <TableComponent/>
                </div>
                </applicationDetailsContext.Provider>
            </div>
        );
}


export default Applications;