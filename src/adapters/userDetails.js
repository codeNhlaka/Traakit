// import { API } from "aws-amplify";
// import { v4 as uuidv4 } from 'uuid';
// import * as mutations from './graphql/mutations';
// import { useStore as storeAPI } from "../store/store";

export class UserDetailsAPI {
    // static async createUserInformation( state ){
    //     // create new record id
    //     const id = uuidv4();
        
    //     // create a record and add new id
    //     const record = Object.assign(state, {
    //         ...state,
    //         id
    //     });

    //     // create user information and pass in record 
    //     const createdUserInfo = await API.graphql({ query: mutations.createUser, variables: { input: record }});
        
    //     if (createdUserInfo){
    //         // get created user details 
    //         const { createUser } = createdUserInfo.data;

    //         return {
    //             user: createUser
    //         }
    //     } 
    // }   


}