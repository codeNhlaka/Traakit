import { useState } from 'react';
import ForgotPassword from './forgotPassword.component';
import AuthAPI from '../../api/auth';

function SignIn(props){
    const [hasCredentials, setHasCredentials] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signIn(){
        let user = undefined;
        if (username && password){
            // sign user in
        }

    }
    
    if (hasCredentials){
        return (
            <>
                <div className="greet-section"></div>
                <div className="form-section">
                    <form>
                        <div>
                            <h1>Continue with</h1>
                            <h3>Sign In</h3>
                            <button onClick={e => {
                                e.preventDefault();
                                props.toggle("signUp")
                            }}>Or create Account</button>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input name="username" type="text" maxLength="12" placeholder="John Doe" onChange={e => setUsername(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" maxLength="12" placeholder="Password123@" onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <button onClick={e => {
                                e.preventDefault();
                                signIn()
                            }}>Continue</button>

                            <button onClick={e => {
                                e.preventDefault();
                                setHasCredentials(false);
                            }}>Forgot password?</button>

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







