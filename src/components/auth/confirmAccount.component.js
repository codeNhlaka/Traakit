import { useContext } from 'react';
import { Formik, Form, Field} from 'formik';
import AuthAPI from '../../api/auth';
import { authConfirmationContext } from "../../appContext";

const FormikConfirm = (props) => (
    <Formik
        initialValues={{
            verificationCode: ''
        }}
        onSubmit={async ({verificationCode}) => {
            const invalidVerificationCodeMessage = 'Invalid verification code provided, please try again.'
            const accountVerified = await AuthAPI.confirmSignUp('codeNhlaka', verificationCode);
            if (accountVerified){
                    if (typeof accountVerified === "string" && accountVerified === invalidVerificationCodeMessage){
                        // handle error;
                        console.log(accountVerified)
                        return;
                    }

                    console.log(accountVerified);
                    return props.confirmAuth();
                }
        }}
    >
        {({isSubmitting}) => (
            <Form>
                <div>
                    <label htmlFor="verificationCode">Confirm Account</label>
                    <Field name="verificationCode" type="text" placeholder="verification code"/>
                </div>
                <p>The confirmation code is sent to your email</p>
                <button disabled={isSubmitting} type="submit">Confirm Account</button>
            </Form>
        )}
    </Formik>
);


function ConfirmAccount(props){
    const confirmAuth = useContext(authConfirmationContext);

    const { username } = props;
    /**
     * Requests a new verification code
     * @returns A message that confirms that the verification code was successfully sent
     */

    async function requestConfirmationCode(){
        if (username){
            const resendVerificationCodeFailure = 'Username cannot be empty';
            let requestSuccessful = await AuthAPI.resendConfirmationCode(username);
        
            if (typeof requestSuccessful === "string" && requestSuccessful === resendVerificationCodeFailure) {
                // handle error;
                return;
            }

            return requestSuccessful;
        }
    }

    return (
        <div>
            <h1>Continue with</h1>
            <h3>Account Confirmation</h3>
            <FormikConfirm confirmAuth={confirmAuth} username={username} />
            <button onClick={ () => requestConfirmationCode()}>Resend code</button>
        </div>
    )
}

export default ConfirmAccount;