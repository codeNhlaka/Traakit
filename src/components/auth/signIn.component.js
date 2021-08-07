import { useState } from 'react';
import ForgotPassword from './forgotPassword.component';
import AuthAPI from '../../api/auth';
import { useFormik } from 'formik';

function FormikSignIn(props){
    async function handleSignIn(username, password){
        let user;
        if (username && password){
            return props.confirmAuthentication();
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
          },
        onSubmit: values => {
            const {username, password} = values;
            console.log(username, password);
            return handleSignIn(username, password);
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}> 
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" value={formik.values.username} name="username" onChange={formik.handleChange} placeholder="JohnDoe" maxLength="12"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={formik.values.password} name="password" onChange={formik.handleChange} placeholder="Password132@" maxLength="14"/>
            </div>
            <button type="submit">Continue</button>
        </form>
    )
}

function SignIn(props){
    const [hasCredentials, setHasCredentials] = useState(true);
    
    if (hasCredentials){
        return (
            <>
            <div className="greet-section"></div>
            <div className="form-section">
                <div>
                    <h1>Continue with</h1>
                    <h3>Sign In</h3>
                    <button onClick={e => {
                        e.preventDefault();
                        props.toggle("signUp")
                    }}>Or create Account</button>

                    <FormikSignIn confirmAuthentication={props.confirmAuthentication}/>

                    <button onClick={e => {
                        e.preventDefault();
                        setHasCredentials(false);
                    }}>Forgot password?</button>

                        </div>
                </div>
            </>
        )
    } else {
        return <ForgotPassword/>
    }

}

export default SignIn;







