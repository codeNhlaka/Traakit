import { createContext, useEffect } from "react";
import { Storage } from "aws-amplify";
import { useStore } from "../store/store";
import { v4 as uuidv4 } from "uuid";


// config amplify storage

Storage.configure({
    customPrefix: {
        public: 'public/documents/',
    }
});


const DocumentsContext = createContext(null);

const DocumentsProvider = ({ children }) => {
    const user = useStore(state => state.about);

    async function deleteDoc(documentID){

    }

    async function downloadDoc(documentID){

    }

    async function uploadDoc(document){
        // create document id
        const documentID = uuidv4();
        const { name } = document;
        const { type } = document;

        // put file in storage
        
        Storage.put(documentID, document)
        .then( documentInfo => {
            // get key and push to db
            const { key } = documentInfo;

            // update state
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log('Hellllllllllloooooooo from context');         


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