import ProfileSettingsComponent from "../components/app/profile_setting.component";
import { useStore } from "../store/store";
import {API, Storage } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

// config amplify storage

Storage.configure({
    customPrefix: {
        public: 'public/images/',
    }
});

function ProfileSettingsModal(){
    const user = useStore(state => state.about);
    const setImageKey = useStore(state => state.setImageKey);
    const setImageUrl = useStore(state => state.setImageUrl);
    const updateAbout = useStore(state => state.updateAbout);

    async function updateInformation(information){
        // get user info from store
        const currentInformation = user.data;
        const { fullnames, skill, employmentStatus} = currentInformation;


        // check if info is valid
        const isValid = (fullnames && skill && employmentStatus) ? true : false;
        
        if (isValid){
            // update
            const { id } = user;

            const userData = {
                id,
                fullnames: information.fullnames || user.data.employmentStatus,
                skill: information.skill || user.data.employmentStatus,
                employmentStatus: information.status || user.data.employmentStatus
            } 

            const updateUserInfo = await API.graphql({ query: mutations.updateUser, variables: { input: userData }});

            if (updateUserInfo.data.updateUser){

                const { updateUser } = updateUserInfo.data;
                const { fullnames, id, skill, employmentStatus } = updateUser;

                return updateAbout({ fullnames, id, skill, employmentStatus});
            }
        

        } else {
            // create
            const { id } = user;

            const userData = {
                id,
                fullnames: information.fullnames || user.data.employmentStatus,
                skill: information.skill || user.data.employmentStatus,
                employmentStatus: information.status || user.data.employmentStatus
            }

            const createUserInfo = await API.graphql({ query: mutations.createUser, variables: { input: userData }});

            if (createUserInfo){
                const { createUser } = createUserInfo.data;
                const { fullnames, id, skill, employmentStatus } = createUser;

                return updateAbout({ fullnames, id, skill, employmentStatus});
            }
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
                            signedURL = await Storage.get(key);
                        } catch(error){
                            console.log(error);
                        }
                        
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
                    
                    if (createdUserImageKey.data.createdUserImage){
                        const { id, key } = createdUserImageKey.data.createUserImage;
                        let signedURL;
                        
                        setImageKey(id, key);

                        // get signed url
                        try {
                            signedURL = await Storage.get(key);
                        } catch(error){
                            console.log(error);
                        }
                        
                        // publish signedURL to store
                        return setImageUrl(signedURL);
                    }
                }
            })
            .catch(error => console.log(error));


        })  
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        // statement...
        console.log(user);
    }, [])

    return <ProfileSettingsComponent
        handleImageUpload={ handleImageUpload }
        user={ user }
        updateInformation={ updateInformation }
    />
}

export default ProfileSettingsModal;