import { useState } from "react"; 
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
            <p className="text-gray-600">SE Resume</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="p-1 text-gray-600 uppercase">pdf</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">CV</p>
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
            <p className="text-gray-600">Extension</p>
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

function UploadFileModal(){
    const [dragging, setDragging] = useState(false);

    function handleDragEnter(e){
        e.preventDefault()
        e.stopPropagation()
        setDragging(true);
    }

    function handleDragLeave(e){
        e.preventDefault()
        e.stopPropagation()
        setDragging(false);
    }

    function handleFileUpload(files){
        // add files push files to s3 bucket
        // update file list
    }

    function handleDrop(e){
        e.preventDefault();
        e.stopPropagation();

        const fileTypes = ['application/pdf', 'pdf'];
        const maxFileSize = 1250000;
        let files = [];
        let errorMessage = {};
        let errorStack = [];

        function convertBytes(bytes) {
            const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
          
            if (bytes == 0) {
              return "n/a"
            }
          
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
          
            if (i == 0) {
              return bytes + " " + sizes[i]
            }
          
            return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
        }
        
        // get files
        const uploadedFiles = e.dataTransfer.files;
        
        for (let i = 0; i <= uploadedFiles.length -1; i++){
            const currentFile = uploadedFiles[i];
            const { type, size } = currentFile;

            if (fileTypes.includes(type) && size < maxFileSize){
                files.push(currentFile);
            } else {
                // check problem
                let unsupportedFileType = !fileTypes.includes(type);
                let exceededMaxSize = size > maxFileSize;

                // get filename
                let { name } = currentFile;
                let filename = name.split('.')[0];
                
                // generate error message
                if (unsupportedFileType){
                    errorMessage.message = {
                        unsupportedFileType: `Format of ${filename} is unsupported`
                    }
                } 

                if (exceededMaxSize){
                    errorMessage.message = {
                        ...errorMessage.message,
                        exceededMaxSize: `File size of ${filename} exceeds max size of ${convertBytes(maxFileSize)}`
                    }
                }

                // record error
                errorStack.push([errorMessage]);
            }
        }
        
        setDragging(false);

        console.log({
            files,
            warnings: errorStack
        });
    }

    return (
        <div 
            onDragEnter={(e) => handleDragEnter(e)} 
            onDragLeave={(e) => handleDragLeave(e)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
            className="container z-50 left-48 top-24 flex justify-center items-center absolute w-2/3 h-3/5 border border-gray-800 bg-coolgray rounded shadow-md">
            <div className="container w-full flex justify-center items-center">
                { dragging ? <h1 className="text-white text-4xl select-none pointer-events-none">Drop here :)</h1> : <h1 className="text-white text-4xl select-none pointer-events-none">Drag and drop your files here</h1>}
            </div>
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
            <UploadFileModal/>
        </div>

    </div>
)

export default DocumentsComponent;