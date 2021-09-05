import UploadFile from "../../../assets/icons/fileupload.icon";

function Tools(props){

    return (
        <div className="relative flex items-center w-full h-10 mt-3 component-title">
            <div onClick={() => props.toggle() } className="flex items-center w-40 h-full ml-5 transition-all rounded-md cursor-pointer hover:bg-selectgreenhover">
                <div className="flex items-center justify-center ml-2 w-9 h-5/6">
                    <UploadFile/>
                </div>
                <p className="text-white select-none">Upload file</p>
            </div>
        </div>
    )
}

export default Tools;