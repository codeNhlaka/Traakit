import { createContext, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { useStore } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import { createDocument } from "../graphql/mutations";

// config amplify storage

Storage.configure({
    customPrefix: {
        public: 'public/documents/',
    }
});


const DocumentsContext = createContext(null);

const DocumentsProvider = ({ children }) => {
    const user = useStore(state => state.about);
    const setDocumentRecord = useStore(state => state.setDocumentRecord);

    async function deleteDoc(documentID){

    }

    async function downloadDoc(documentID){

    }

    async function uploadDoc(document){
        let uploadedFile;

        // create document id
        const documentID = uuidv4();
        const { name } = document;
        let { type } = document;
        const category = "doc";

        if (type === "application/pdf") type = "pdf";

        // put file in storage

        Storage.put(documentID, document)
        .then( async (documentInfo) => {
            // get key and push to db
            const { key } = documentInfo;
            const documentData = {
                id: documentID,
                key,
                name,
                type,
                category
            }

            const uploadDocument = await API.graphql({query: createDocument, variables: {input: documentData }})

            if (uploadDocument.data.createDocument){
                
                // get uploaded file
                uploadedFile = uploadDocument.data.createDocument;

                // update state
                return setDocumentRecord(uploadedFile);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        // fetch user documents
        const documentsList = Storage.list('').then( docs => {
            // poccess each file   
        })
        .catch(error => {
            console.log(error);
        })
        
    }, []);

    return (
        <DocumentsContext.Provider value={ {uploadDoc, deleteDoc, downloadDoc} }>
            { children }
        </DocumentsContext.Provider>
    )
}

export { DocumentsContext, DocumentsProvider };