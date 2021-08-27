import { API } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import * as mutations from './graphql/mutations';
import { useStore as storeAPI } from "../store/store";

export class UserDetailsAPI {
    static async createUserInformation( state ){
        // create new record id
        const id = uuidv4();
        
        // create a record and add new id
        const record = Object.assign(state, {
            ...state,
            id
        });

        // create user information and pass in record 
        const createdUserInfo = await API.graphql({ query: mutations.createUser, variables: { input: record }});
        
        if (createdUserInfo){
            // get created user details 
            const { createUser } = createdUserInfo.data;

            return {
                user: createUser
            }
        } 
    }   


    static async updateUserInformation(id){

    }

    static async updateUserImage(key) {
        // get user info
        const user = storeAPI(state => state.about);

        // check if this user has an imageId
        const { id } = user.imageKey.id;
        
        if (id){
            // if user has image, update it
            const setImageKey = storeAPI(state => state.setImageKey);
    
            const imageData = {
                id,
                key
            }
    
            const updatedImageKey = await API.graphql({ query: mutations.updateUserImage, variables: { input: imageData }});
            
            if (updatedImageKey){
                const { id, key } = updatedImageKey.data.updateUserImage;
                return setImageKey(id, key);
            }

        } else {
            // else create one

            const setImageKey = storeAPI(state => state.setImageKey);
            const id = uuidv4();
    
            const imageData = {
                id,
                key
            }
    
            const createdUserImageKey = await API.graphql({ query: mutations.createUserImage, variables: { input: imageData }});
            if (createdUserImageKey){
                const { id, key } = createdUserImageKey.data.createUserImage;
                return setImageKey(id, key);
            }
        }
    }
}