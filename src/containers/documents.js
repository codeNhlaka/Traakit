import DocumentsComponent from "../components/documents/documents.component";
import { Storage } from "aws-amplify";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { v4 as uuidv4 } from "uuid";

// config storage

Storage.configure({
    customPrefix: {
        public: 'public/documents/',
    }
});

function Documents(){
    const user = useStore(state => state.about);
    const { id } = user;

    async function deleteDoc(documentID){

    }

    async function downloadDoc(documentID){

    }

    async function uploadDoc(document){
        
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
    return <DocumentsComponent
        uploadDocument={ uploadDoc }
        deleteDocument={ deleteDoc }
        downloadDocument={ downloadDoc }
    />
}

export default Documents;