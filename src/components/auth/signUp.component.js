import { useState } from 'react';
import ConfirmAccount from './confirmAccount.component';

function SignUp(props){
    const [user, setUser] = useState(false);
    if (user){
       return <ConfirmAccount/>
    } else {
        return (
            <div>
                <h1>SignUp Component</h1>
                <button onClick={() => props.toggle("signIn")}>Already a member</button>
                <button onClick={() => setUser(true)}>Sign Up</button>
            </div>
        )
    }
}

export default SignUp;