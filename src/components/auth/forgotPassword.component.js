import { useState } from 'react';

function SetNewPassword(){
    function confirmNewPassword(){
        // confirm new password then sign user in
        alert('SUCCESS!')
    }

    return (
        <div>
            <h1>Set New Password Component</h1>
            <button onClick={() => confirmNewPassword()}>Change Password</button>
        </div>
    )
}

function ForgotPassword(){
    const [validatedAccount, setValidatedAccount] = useState(false); 
    if (!validatedAccount){
        return (
            <div>
                <h1>Forgot Password Component</h1>
                <button onClick={() => setValidatedAccount(true)}>Confirm and Set New Password</button>
            </div>
        )
    } else return <SetNewPassword/>
}

export default ForgotPassword;