import { useEffect, useContext } from "react";
import { confirmFileContext } from "../documents.component";

function ConfirmFileModal(props){
    const toggleConfirmFile = useContext(confirmFileContext);

    function handleFileUpload(){
        // add files push files to s3 bucket
        // update file list
        return toggleConfirmFile();
    }

    return (
        <div className="container z-50 transition-all left-1/3 top-20 absolute w-1/3 h-40 border border-gray-800 bg-coolgray rounded shadow-md">
            <div className="border-b w-full h-10 border-gray-800">
                <h1 className="w-40 text-white ml-5 mt-1 overflow-hidden select-none text-xl">Update File</h1>
            </div>

            <div className="w-full h-10 bg-selectgray flex items-center">
                <div className="bg-coolgray w-28 h-full flex items-center">
                    <h1 className="ml-5 text-gray-600 select-none">Filename</h1>
                </div>

                <div className="w-28 h-full flex items-center">
                    <h1 className=" ml-5 text-gray-600 select-none">Resume SE</h1>
                </div>
            </div>

            <div className="mt-5 w-full h-10">
                <button onClick={() => handleFileUpload() } className="bg-selectgreen select-none hover:bg-selectgreenhover float-right mr-5 relative text-white flex justify-center items-center h-full w-40">Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmFileModal;