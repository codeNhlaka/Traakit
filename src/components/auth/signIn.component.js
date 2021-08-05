import { useState } from 'react';
import ForgotPassword from './forgotPassword.component';

{/* <h1>SignIn Component</h1>
<button onClick={() => props.toggle("signUp")}>Create Account</button>
<button onClick={() => setHasCredentials(false)}>Forgot Password</button> */}

function SignIn(props){
    const [hasCredentials, setHasCredentials] = useState(true);

    if (hasCredentials){
        return (
            <section>
                <div></div>
                <div></div>
            </section>
        )
    } else {
        return <ForgotPassword/>
    }

}

export default SignIn;