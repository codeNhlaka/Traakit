import { useState, useContext } from 'react';
import ConfirmAccount from './confirmAccount.component';
import { Formik, Form, Field } from 'formik';
import AuthAPI from '../../adapters/auth';
import { toggleOption } from './authUser.component';
import { v4 as uuidv4 } from 'uuid';


const FormikSignUp = (props) => (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={async ({username, email, password}) => {  
            // create user id
            const userId = uuidv4();
            // create a new user account      
            const createUserAccount = await AuthAPI.signUp(username, password, email, userId);
            // check if the account was created successfully
            if (createUserAccount && createUserAccount['username']){
                return props.userAccountCreated(true, createUserAccount.username);
            } else {
                // handle errors
                return
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

function SignUp(){
    const [user, setUser] = useState(false);
    const [authenticatedUsername, setAuthenticatedUsername] = useState('');
    const switchRenderedComponent = useContext(toggleOption);

    /**
     * Sets the SignUp component to recognize the new user and renders the ConfirmAccount component
     * @param { Boolean } complete Complete confirms the user account was successfully created
     * @param { String} username Username returns the username of the newly created user account
     */

    function userAccountCreated(complete, username){
        setAuthenticatedUsername(username);

        if (complete){
            setUser(true);
        }
    }

     if (user){
         // if a new account is created, return the confirm component to handle the account confirmation process
       return <ConfirmAccount username={authenticatedUsername}/>
    } else {
        return (
            <>
            <div className="greet-section"></div>
            <div className="form-section">
                <div>
                    <h1>Continue with</h1>
                    <h3>Sign Up</h3>
                    <button onClick={() => {
                        switchRenderedComponent("signIn")
                    }}>Already a member</button>

                    <FormikSignUp userAccountCreated={ userAccountCreated }/>
                </div>
            </div>
            </>
        )
    }
}

export default SignUp;

