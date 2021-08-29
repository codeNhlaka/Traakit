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
        // fetch user documenets
        
    }, []);
    return <DocumentsComponent/>
}

export default Documents;