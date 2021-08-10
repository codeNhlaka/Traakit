import {useState} from 'react';
import SignIn from './auth/signIn.component';
import SignUp from './auth/signUp.component';

export default function HandleAuthentication(props){
    const [hasAccount, setHasAccount] = useState(true);
    
    /**
     * 
     * @param { String } option Option provides clear indication on which component should be rendered 
     * @returns JSX Element based on option [signIn/SignOut]
     */
    
    function switchRenderedComponent(option){
        if (option === "signIn"){
            return setHasAccount(true)
        } else if (option === "signUp"){
            return setHasAccount(false);
        } else return;
    }

    return hasAccount ? (
            <section className="fullwidth">
                <SignIn confirmAuthentication={props.confirmAuthentication} toggle={ switchRenderedComponent }/> 
            </section>
        ) 
        : (
            <section className="fullwidth">
                <SignUp confirmAuthentication={props.confirmAuthentication} toggle={ switchRenderedComponent }/>
            </section>
        )
}