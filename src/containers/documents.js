import DocumentsComponent from "../components/documents/documents.component";
import { Storage } from "aws-amplify";
import { useEffect } from "react";

// config storage

Storage.configure({
    customPrefix: {
        public: 'public/documents/',
    }
});

function Documents(){
    useEffect(() => {

        function processDocument(doc){
            // do something
            console.log(doc)
        }

        // fetch user documents
        const documentsList = Storage.list('').then( docs => {
            // poccess each file            
        })
        .catch(error => {
            console.log(error);
        })
        
    }, []);
    return <DocumentsComponent/>
}

export default Documents;