import { useState } from 'react';
import ForgotPassword from './forgotPassword.component';
import AuthAPI from '../../api/auth';
import { Formik, Form, Field } from 'formik';

const FormikSignIn = () => (
    <Formik>
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







