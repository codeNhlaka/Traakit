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
                    <form>
                        <div>
                            <h1>Continue with</h1>
                            <h3>Sign In</h3>
                        </div>
                    </form>
                </div>
            </>
        )
    } else {
        return <ForgotPassword/>
    }

}

export default SignIn;







