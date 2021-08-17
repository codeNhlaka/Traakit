import Navigation from "./nagivation.component";
import ExportIcon from "../../assets/icons/export.icon";
import FilterIcon from "../../assets/icons/filter.icon";
import UploadFile from "../../assets/icons/fileupload.icon";

function Tools(){
    return (
        <div className="component-title relative flex items-center w-full h-10 mt-3">
            <div className="cursor-pointer ml-5 hover:bg-selectgreenhover transition-all w-40 h-full flex items-center">
                <div className="w-9 h-5/6 ml-2 flex justify-center items-center">
                    <UploadFile/>
                </div>
                <p className="text-white select-none">Upload file</p>
            </div>
        </div>
    )
}

function TableList(){
    return (
        <div className="component-table-content-details cursor-pointer text-sm relative select-none flex items-center overflow-hidden transition-all hover:bg-coolgray w-full h-12">
        <div className="w-40 ml-5 flex items-center h-full">
            <p1 className="text-gray-600">SE Resume</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="p-1 text-gray-600 uppercase">pdf</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">CV</p1>
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

function TableHero(){
    return (
        <div className="component-table-content uppercase text-sm sticky border-b border-gray-800 select-none flex items-center overflow-hidden bg-coolgray w-full h-10">
        <div className="w-40 ml-5 flex items-center h-full">
            <p1 className="text-gray-600">Filename</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">Extension</p1>
        </div>
        <div className="w-40 flex items-center h-full">
            <p1 className="text-gray-600">Category</p1>
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

function TableComponent(){
    return (
        <div className="component-table relative w-full h-4/6 mt-3">
            <TableHero/>
            <TableList/>
        </div>
    )
}

const DocumentsComponent = (props) => (
    <div className='None:container relative overflow-hidden h-screen bg-selectgray'>
        <Navigation/>
        <div style={
        {left: '20%'}
        } className="container absolute w-4/5 h-full">
            <div className="component-title flex items-center w-full h-16 mt-10">
                <h1 className="text-white w-auto pointer-events-none select-none ml-5 text-4xl">Your documents</h1>
            </div>
        <Tools/>
        <TableComponent/>
        </div>
        
    </div>
)

export default DocumentsComponent;