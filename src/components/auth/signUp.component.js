import { useState } from 'react';
import ConfirmAccount from './confirmAccount.component';
import { Formik, Form, Field } from 'formik';
import AuthAPI from '../../api/auth';

const FormikSignUp = (props) => (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={async ({username, email, password}) => {        
        try {
            const createUserAccount = await AuthAPI.signUp(username, password, email);
            return props.userCreated(true, createUserAccount.username);
        } catch(error){
            // handle error!
            console.log(error);
        }
      }}
    >
    {({ isSubmitting }) => (
        <div>
            <Form>
                <div>
                    <label htmlFor="username">Username</label>
                    <Field name="username" placeholder="codeNhlaka"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" placeholder="codeNhlaka@gmail.com"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" placeholder="Password123"/>
                </div>
                <button type="submit" disabled={ isSubmitting }>Continue</button>
            </Form>
        </div>
    )}
    </Formik>
);

function SignUp(props){
    const [user, setUser] = useState(false);
    const [authenticatedUsername, setAuthenticatedUsername] = useState('');

    function userCreated(complete, username){
        setAuthenticatedUsername(username);

        if (complete){
            setUser(true);
        }
    }

    if (user){
       return <ConfirmAccount confirmAuthentication={ props.confirmAuthentication } username={authenticatedUsername}/>
    } else {
        return (
            <>
            <div className="greet-section"></div>
            <div className="form-section">
                <div>
                    <h1>Continue with</h1>
                    <h3>Sign Up</h3>
                    <button onClick={e => {
                        e.preventDefault();
                        props.toggle("signIn")
                    }}>Already a member</button>

                    <FormikSignUp userCreated={userCreated}/>
                </div>
            </div>
            </>
        )
    }
}

export default SignUp;

