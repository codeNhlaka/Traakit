import { useState } from 'react';
import ForgotPassword from './forgotPassword.component';

{/* <h1>SignIn Component</h1>
<button onClick={() => props.toggle("signUp")}>Create Account</button>
<button onClick={() => setHasCredentials(false)}>Forgot Password</button> */}

function SignIn(props){
    const [hasCredentials, setHasCredentials] = useState(true);
    
    if (hasCredentials){
        return (
            <>
                <div className="greet-section"></div>
                <div className="form-section">
                    <div className="bg-gray-600 md:container">
                        
                    </div>
                </div>
            </>
        )
    } else {
        return <ForgotPassword/>
    }

}

export default SignIn;







