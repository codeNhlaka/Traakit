import { useContext, useState } from "react";
import { DocumentsContext } from "../../../context/documents";

export function convertBytes(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  
    if (bytes === 0) {
      return "n/a"
    }
  
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  
    if (i === 0) {
      return bytes + " " + sizes[i]
    }
  
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}

function UploadFileModal(props){
    const [dragging, setDragging] = useState(false);
    const { uploadDoc } = useContext(DocumentsContext);
    

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

    function handleDrop(e){
        e.preventDefault();
        e.stopPropagation();

        const fileTypes = ['application/pdf', 'pdf', 'docx', 'dot', 'dotx', 'eml'];
        const maxFileSize = 1250000;
        let files = [];
        let errorMessage = {};
        let errorStack = [];
        
        // get files
        const uploadedFiles = e.dataTransfer.files; 

        for (let i = 0; i <= uploadedFiles.length - 1; i++){
            const currentFile = uploadedFiles[i];
            const { type, size } = currentFile;

            if (fileTypes.includes(type) && size < maxFileSize){
                if(files.length <= 1){
                    // support only one file upload
                    files.push(currentFile);
                } else return;
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

        const warnings = errorStack;

        // if files contains a document, upload current files
        uploadDoc(files[0]);
        
        // close modal
        props.toggle();
        return warnings;
    }

    return (
        <div 
            onDragEnter={(e) => handleDragEnter(e)} 
            onDragLeave={(e) => handleDragLeave(e)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
            className="absolute z-50 flex items-center justify-center w-2/3 transition-all border border-gray-800 rounded shadow-md left-48 top-24 h-3/5 bg-coolgray">
            <div className="w-full h-auto">
                <div className="w-full">
                    { dragging ? <h1 className="w-full text-4xl text-center text-white pointer-events-none">Drop here :)</h1> : <h1 className="text-4xl text-center text-white pointer-events-none select-none">Drag and drop your files here</h1>}
                </div>
                <div className="w-full mt-2">
                    <h1 className="text-center text-white">
                        <span className="p-1 text-white bg-opacity-60 bg-selectgreen">PDF</span> 
                        <span className="p-1 ml-2 text-white bg-opacity-60 bg-selectgreen">Microsoft Word Docs</span>
                    </h1>
                </div>
            </div>
            
        </div>
    )
}


export default UploadFileModal;