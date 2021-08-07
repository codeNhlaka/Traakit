import { useState } from 'react';
import {Formik, Form, Field } from 'formik';

const FormikNewPassword = () => (
    <Formik
        initialValues={{
            code: '',
            newPassword: ''
        }}
        onSubmit={async ({code, newPassword}) => {
            console.log(code, newPassword);
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
                </div>
                <button type="submit" disabled={isSubmitting}>Continue</button>
            </Form>
        )}
    </Formik>
)

function SetNewPassword(){
    return (
        <div>
            <h1>Set New Password Component</h1>
            <FormikNewPassword/>
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
            // make necesssary api calls
            props.confirmVerification();
        }}
    >
        {({isSubmitting}) => ( 
            <Form>
                <div>
                    <label htmlFor="username">Username</label>
                    <Field name="username" placeholder="codeNhlaka"/>
                </div>
                <button type="submit" disabled={isSubmitting}>Continue</button>
            </Form>
        )}
    </Formik>
)

function ForgotPassword(){
    const [accountVerificationComplete, setAccountVerificationComplete] = useState(false); 
    function verificationConfirmation(){
        return setAccountVerificationComplete(true);
    }

    if (!accountVerificationComplete){
        return (
            <div>
                <h1>Reset Password</h1>
                <FormikForgotPassword confirmVerification={verificationConfirmation}/>
            </div>
        )
    } else return <SetNewPassword/>
}

export default ForgotPassword;