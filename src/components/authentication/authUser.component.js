import React, {useState} from 'react';
import SignIn from './signIn.component';
import SignUp from './signUp.component';

export const toggleOption = React.createContext(null);

export default function AuthenticateUser(props){
    const [hasAccount, setHasAccount] = useState(true);
    
    /**
     * Toggles between signIn and signUp component when invoked
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
            <toggleOption.Provider value={ switchRenderedComponent }>
                <section className="fullwidth">
                    <SignIn toggleOption={ switchRenderedComponent } /> 
                </section>
            </toggleOption.Provider>
        ) 
        : (
            <toggleOption.Provider value={ switchRenderedComponent }>
                <section className="fullwidth">
                    <SignUp/>
                </section>
            </toggleOption.Provider>
        )
}