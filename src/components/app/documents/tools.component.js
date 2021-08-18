import { useContext } from "react";
import { fileUploadContext } from "../documents.component";
import UploadFile from "../../../assets/icons/fileupload.icon";

function Tools(){
    const toggleFileUpload = useContext(fileUploadContext);

    return (
        <div className="component-title relative flex items-center w-full h-10 mt-3">
            <div onClick={() => toggleFileUpload() } className="cursor-pointer ml-5 hover:bg-selectgreenhover transition-all w-40 h-full flex items-center">
                <div className="w-9 h-5/6 ml-2 flex justify-center items-center">
                    <UploadFile/>
                </div>
                <p className="text-white select-none">Upload file</p>
            </div>
        </div>
    )
}

export default Tools;