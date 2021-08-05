import {useState} from 'react';
import SignIn from './auth/signIn.component';
import SignUp from './auth/signUp.component';

export default function HandleAuthentication(){
    const [hasAccount, setHasAccount] = useState(true);

    // toggle between signIn and signOut
    function changeTo(option){
        if (option === "signIn"){
            return setHasAccount(true)
        } else if (option === "signUp"){
            return setHasAccount(false);
        } else return;
    }
    

    return hasAccount ? <SignIn toggle={ changeTo }/> : <SignUp toggle={changeTo}/>
}