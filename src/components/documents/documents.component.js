import { createContext, useContext, useState } from "react"; 
import Navigation from "../routes/nagivation.component";
import UploadFileModal from "./components/uploadModal.component";
import ConfirmFileModal from "./components/confirmFileModal.component";
import TableComponent from "./components/table.component";
import Tools from "./components/tools.component";

export const fileUploadContext = createContext(null);
export const confirmFileContext = createContext(null);


const Documents = (props) => { 
    const [showUploadModal, setUploadModal] = useState(false);
    const [showConfirmFileModal, setConfirmFileModal] = useState(false);
    const [files, setFiles] = useState(null); 

    function toggleFileUpload(){
        return setUploadModal(!showUploadModal);
    }

    function toggleConfirmFile(files){
        if (files){
            setFiles(files);
            setUploadModal(!showUploadModal);
            return setConfirmFileModal(!showConfirmFileModal);
        }

        return setConfirmFileModal(!showConfirmFileModal);
    }


    return (
        <div className='None:container relative overflow-hidden h-screen bg-selectgray'>
        <Navigation/>
        <div style={
        {left: '20%'}
        } className="container absolute w-4/5 h-full">
            <div className="component-title flex items-center w-full h-16 mt-10">
                <h1 className="text-white w-auto pointer-events-none select-none ml-5 text-4xl">Your documents</h1>
            </div>
            <fileUploadContext.Provider value={ toggleFileUpload }>
                <Tools/>
            </fileUploadContext.Provider>
            <TableComponent/>
            <confirmFileContext.Provider value={ toggleConfirmFile }>
                {showUploadModal ? <UploadFileModal/> : null}
                { showConfirmFileModal ? <ConfirmFileModal files={files}/> : null}
            </confirmFileContext.Provider>
        </div>

        </div>
    )
}

export default Documents;