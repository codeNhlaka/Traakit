import {useEffect, useState} from 'react';
import SignIn from './auth/signIn.component';
import SignUp from './auth/signUp.component';
import '../css/authentication/auth.css';

export default function HandleAuthentication(){
    const [hasAccount, setHasAccount] = useState(true);
    
    function switchRenderedComponent(option){
        if (option === "signIn"){
            return setHasAccount(true)
        } else if (option === "signUp"){
            return setHasAccount(false);
        } else return;
    }

    return hasAccount ? (
            <section className="fullwidth">
                <SignIn toggle={ switchRenderedComponent }/> 
            </section>
        ) 
        : (
            <section className="fullwidth">
                <SignUp toggle={ switchRenderedComponent }/>
            </section>
        )
}