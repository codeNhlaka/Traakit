import { createContext, useContext, useState } from "react"; 
import Navigation from "../routes/nagivation.component";
import UploadFileModal from "./components/uploadModal.component";
import TableComponent from "./components/table.component";
import Tools from "./components/tools.component";
import { DocumentsProvider } from "../../context/documents";
export const fileUploadContext = createContext(null);


const Documents = (props) => { 
    const [showUploadModal, setUploadModal] = useState(false);

    function toggleFileUpload(){
        return setUploadModal(!showUploadModal);
    }

    return (
        <DocumentsProvider>
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
                    { showUploadModal ? <UploadFileModal toggle={ toggleFileUpload } /> : null }
                </div>

            </div>
        </DocumentsProvider>
    )
}

export default Documents;