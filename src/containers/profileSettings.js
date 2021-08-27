import ProfileSettingsComponent from "../components/app/profile_setting.component";
import { useState } from "../store/store";
import {API, Storage } from "aws-amplify";
import { useStore } from "../store/store";
import * as mutations from "../graphql/mutations";
import { v4 as uuidv4 } from 'uuid';


function ProfileSettingsModal(){
    const user = useStore(state => state.about);
    const setImageKey = useStore(state => state.setImageKey);

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
                        generatedKey
                    }
            
                    // update db 
                    const updatedImageKey = await API.graphql({ query: mutations.updateUserImage, variables: { input: imageData }});
                    
                    if (updatedImageKey){
                        const { id, key } = updatedImageKey.data.updateUserImage;
                        return setImageKey(id, key);
                    }
        
                } else {
                    // else create one
        
                    const id = uuidv4();
            
                    const imageData = {
                        id,
                        key: generatedKey
                    }
                    
                    const createdUserImageKey = await API.graphql({ query: mutations.createUserImage, variables: { input: imageData }});
                    
                    if (createdUserImageKey){
                        const { id, key } = createdUserImageKey.data.createUserImage;
                        return setImageKey(id, key);
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

    return <ProfileSettingsComponent
        handleImageUpload={ handleImageUpload }
        user={ user }
        createUserInformation={ createUserInformation }
        updateInformation={ updateInformation }
    />
}

export default ProfileSettingsModal;