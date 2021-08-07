import { useState } from 'react';
import ConfirmAccount from './confirmAccount.component';
import { Formik, Form, Field } from 'formik';
import AuthAPI from '../../api/auth';

const FormikSignUp = () => (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={async (values) => {
        // perform operations
        console.log(values);
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
                    <ul>
                        <li>Password must at least have 8 characters</li>
                        <li>Include at least one capital character</li>
                        <li>Include at least one lowercase character</li>
                        <li>Include at least one number</li>
                    </ul>
                </div>
                <div>
                    <label htmlFor="confirm password">Confirm Password</label>
                    <Field type="confirm password" name="confirm password" placeholder="Password123"/>
                    <ul>
                        <li>Password does not match</li>
                    </ul>
                </div>
                <button type="submit" disabled={ isSubmitting }>Continue</button>
            </Form>
        </div>
    )}

    </Formik>
);

function SignUp(props){
    const [user, setUser] = useState(false);

    function userCreated(complete){
        if (complete){
            setUser(true);
        }
    }

    if (user){
       return <ConfirmAccount confirmAuthentication={props.confirmAuthentication}/>
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

