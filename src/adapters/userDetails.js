import Amplify, { Storage } from "aws-amplify";

class UserDetailsAPI {
    static async setUserImage(file, key){
        const result = await Storage.put()
    }
}