import { useState } from 'react';
import {Formik, Form, Field } from 'formik';
import AuthAPI from '../../adapters/auth';

const FormikNewPassword = (props) => (
    <Formik
        initialValues={{
            code: '',
            newPassword: ''
        }}
        onSubmit={async ({code, newPassword}) => {
            const invalidVerificationCodeMessage = 'Invalid verification code provided, please try again.'
            
            const setNewPasswordRequest = await AuthAPI.setNewPassword(props.username, code, newPassword);
            if (setNewPasswordRequest){
                if (setNewPasswordRequest === invalidVerificationCodeMessage){
                    // handle error;
                    const error = setNewPasswordRequest;
                    return;
                }

                return props.provideCredentials();
            }
        }}
    >
        {({isSubmitting}) => (
            <Form>
                <div>
                    <label htmlFor="code">Verification</label>
                    <Field name="code" placeholder="Verification code"/>
                </div>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <Field name="newPassword" type="password" placeholder="Password1234"/>
                    <p>- have at least 8 characters</p>
                </div>
                <button type="submit" disabled={isSubmitting}>Continue</button>
            </Form>
        )}
    </Formik>
)

function SetNewPassword(props){
    return (
        <div>
            <h1>Set New Password Component</h1>
            <FormikNewPassword username={props.username} provideCredentials={props.provideCredentials}/>
        </div>
    )
}

const FormikForgotPassword = (props) => (
    <Formik
        initialValues= {
            {
                username: ''
            }
        }
        onSubmit={async ({username}) => {
            const noUserFoundErrorMessage = 'Username/client id combination not found.';
            const resetPasswordRequest = await AuthAPI.forgotPassword(username);
            
            if (resetPasswordRequest){
                if (typeof resetPasswordRequest === "string" && resetPasswordRequest === noUserFoundErrorMessage ){
                    // handle error;
                    console.log(resetPasswordRequest)
                    return;
                }

                props.confirmVerification(username);
            }
        }}
    >
        {({isSubmitting}) => ( 
            <Form>
                <div>
                    <label htmlFor="username">Username</label>
                    <Field name="username" placeholder="codeNhlaka"/>
                    <p>We'll send a verification code to your email</p>
                </div>
                <button type="submit" disabled={isSubmitting}>Continue</button>
            </Form>
        )}
    </Formik>
)

function ForgotPassword(props){
    const [accountVerificationComplete, setAccountVerificationComplete] = useState(true); 
    const [username, setUsername] = useState('');

    function verificationConfirmation(username){
        if (username) setUsername(username);
        return setAccountVerificationComplete(true);
    }

    if (!accountVerificationComplete){
        return (
            <div>
                <h1>Reset Password</h1>
                <FormikForgotPassword confirmVerification={verificationConfirmation}/>
            </div>
        )
    } else return <SetNewPassword provideCredentials={props.provideNewCredentials} username={username} />
}

export default ForgotPassword;