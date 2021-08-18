
function TableList(){
    return (
        <div className="component-table-content-details cursor-pointer text-sm relative select-none flex items-center overflow-hidden transition-all hover:bg-coolgray w-full h-12">
        <div className="w-40 ml-5 flex items-center h-full">
            <p className="text-gray-600">SE Resume</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="p-1 text-gray-600 uppercase">pdf</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">DOC</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">17 Aug</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">14:43am</p>
        </div>
    </div>
    )
}

function TableHero(){
    return (
        <div className="component-table-content uppercase text-sm sticky border-b border-gray-800 select-none flex items-center overflow-hidden bg-coolgray w-full h-10">
        <div className="w-40 ml-5 flex items-center h-full">
            <p className="text-gray-600">Filename</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Type</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Category</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Time</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Date</p>
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

export default TableComponent;