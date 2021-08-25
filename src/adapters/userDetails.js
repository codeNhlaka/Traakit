import Amplify, { Storage } from "aws-amplify";

export class UserDetailsAPI {
    static async setUserImage(file, key){
        let result;

        try {
            result = await Storage.put(key, file);
            console.log(result);
            return true;
        } catch(error){
            console.log(error);
        }
    }
}