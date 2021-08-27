import ProfileSettingsComponent from "../components/app/profile_setting.component";
import { useStore } from "../store/store";
import { useState } from "react";
import {API, Storage } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

function ProfileSettingsModal(){
    const user = useStore(state => state.about);
    const setImageKey = useStore(state => state.setImageKey);
    const setImageUrl = useStore(state => state.setImageUrl);

    async function updateInformation(){
        if (!user.id){
            // if user id, create information
        } else {
            // else update user information
        }
    }

    async function handleImageUpload(e){
        const { files } = e.target;
        const image = files[0];

        // generate key
        const generatedKey = uuidv4();

        // get current image 
        Storage.list('')
        .then( imageList => {

            // if there's an existing image, remove it
            if (imageList.length){
                let i;
                
                for(i = 0; i <= imageList.length - 1; i++){
                    // get image key
                    const { key } = imageList[i];
                    
                    // remove current image
                    Storage.remove(key);
                }
            } 

            // put image
            Storage.put(generatedKey, image)
            .then(async (data) => {

                // put key in db

                // get id from user details, this confirms whether the current user
                // has an existing image
                const { id } = user.imageKey; 
        
                if (id){
                    // if user has image, update it
        
                    const imageData = {
                        id,
                        key: generatedKey
                    }
            
                    // update db 
                    const updatedImageKey = await API.graphql({ query: mutations.updateUserImage, variables: { input: imageData }});
                    
                    if (updatedImageKey){
                        const { id, key } = updatedImageKey.data.updateUserImage;
                        let signedURL;

                        // set keys

                        setImageKey(id, key);
                        
                        // request signed url

                        try {
                            console.log('fetching key')
                            signedURL = await Storage.get(key);
                        } catch(error){
                            console.log(error);
                        }
                        
                        console.log(signedURL);
                        return setImageUrl(signedURL);
                    }
        
                } else {
                    // else create one
        
                    const id = user.id;
            
                    const imageData = {
                        id,
                        key: generatedKey
                    }
                    
                    const createdUserImageKey = await API.graphql({ query: mutations.createUserImage, variables: { input: imageData }});
                    
                    if (createdUserImageKey){
                        const { id, key } = createdUserImageKey.data.createUserImage;
                        let signedURL;
                        
                        setImageKey(id, key);

                        try {
                            console.log('fetching key')
                            signedURL = await Storage.get(key);
                        } catch(error){
                            console.log(error);
                        }
                        
                        console.log(signedURL);
                        return setImageUrl(signedURL);
                    }
                }
            })
            .catch(error => console.log(error))


        })  
        .catch(error => {
            console.log(error);
        })
    }

    async function createUserInformation(){
        if (!user.id){

        }
    }

    useEffect(() => {
        async function getSignedURL(){

        }

        getSignedURL();
    }, [])

    return <ProfileSettingsComponent
        handleImageUpload={ handleImageUpload }
        user={ user }
        createUserInformation={ createUserInformation }
        updateInformation={ updateInformation }
    />
}

export default ProfileSettingsModal;