import { useState, useContext, useEffect } from 'react';
import ForgotPassword from './forgotPassword.component';
import AuthAPI from '../../adapters/auth';
import { Formik, Form, Field } from 'formik';
import { toggleOption } from './authUser.component';
import { authConfirmationContext } from "../../context/appContext";

const FormikSignIn = (props) => (
    <Formik
        initialValues={{
            username: '',
            password: ''
        }}
        onSubmit={async ({username, password}) => {
            const signInFailureMessage = 'Incorrect username or password.'
            const signInUser = await AuthAPI.signIn(username, password);
            if (signInUser){
                if (typeof signInUser === "string" && signInUser === signInFailureMessage){
                    // handle error;
                    return signInFailureMessage;
                }

                return props.confirmAuth();
            }
        }}
    >
        {({isSubmitting}) => (
           <Form>
               <div>
                   <label htmlFor="username">Username</label>
                   <Field name="username" placeholder="codeNhlaka"/>
               </div>
               <div>
                   <label>Password</label>
                   <Field type="password" name="password" placeholder="Password123"/>
               </div>
               <button type="submit" disabled={isSubmitting}>Continue</button>
           </Form>
        )}
    </Formik>
)

function SignIn(){
    const [hasCredentials, setHasCredentials] = useState(true);
    const switchRenderedComponent = useContext(toggleOption);
    const confirmAuth = useContext(authConfirmationContext);

    function provideNewCredentials(){
        return setHasCredentials(true);
    }

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
                        switchRenderedComponent("signUp")
                    }}>Or create Account</button>

                    <FormikSignIn confirmAuth={ confirmAuth }/>

                    <button onClick={e => {
                        e.preventDefault();
                        setHasCredentials(false);
                    }}>Forgot password?</button>

                </div>
            </div>
            </>
        )
    } else {
        return <ForgotPassword provideNewCredentials={provideNewCredentials}/>
    }

}

export default SignIn;







