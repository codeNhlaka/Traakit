import { useState, createContext } from 'react';
import Navigation from '../components/routes/nagivation.component';
import UploadFileModal from '../components/documents/components/uploadModal.component';
import TableComponent from '../components/documents/components/table.component';
import Tools from '../components/documents/components/tools.component';
import { DocumentsProvider } from '../context/documents';

export const fileUploadContext = createContext(null);

export default function Documents(){
    const [uploadModal, setUploadModal] = useState(false);

    // hide/show upload modal
    function showUploadModal(){
        return setUploadModal(!uploadModal);
    }

    return (
        <DocumentsProvider>
            <div className='documents'>
                <Navigation/>
                <div className="documents-content">
                    <div className="documents-title">
                        <h1 className="documents-title-content">Your Documents</h1>
                    </div>
                    <Tools toggle={ showUploadModal }/>
                    <TableComponent/>
                    { uploadModal ? <UploadFileModal toggle={ showUploadModal } /> : null }
                </div>
            </div>
        </DocumentsProvider>
    )
}