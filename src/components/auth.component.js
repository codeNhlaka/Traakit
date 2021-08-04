import {useState, useEffect} from 'react';


function ConfirmAccount(){
    // confirm account then sign user in

    function confirmAccount(){
        alert('SUCCESS!')
    }

    return (
        <div>
            <h1>Confirm Account Component</h1>
            <button onClick={() => confirmAccount()} >Confirm Account</button>
        </div>
    )
}

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

function SignIn(props){
    const [hasCredentials, setHasCredentials] = useState(true);

    if (hasCredentials){
        return (
            <div>
                <h1>SignIn Component</h1>
                <button onClick={() => props.toggle("signUp")}>Create Account</button>
                <button onClick={() => setHasCredentials(false)}>Forgot Password</button>
            </div>
        )
    } else {
        return <ForgotPassword/>
    }

}

function SignUp(props){
    const [user, setUser] = useState(false);
    if (user){
       return <ConfirmAccount/>
    } else {
        return (
            <div>
                <h1>SignUp Component</h1>
                <button onClick={() => props.toggle("signIn")}>Already a member</button>
                <button onClick={() => setUser(true)}>Sign Up</button>
            </div>
        )
    }
}


export default function HandleAuthentication(){
    const [hasAccount, setHasAccount] = useState(true);

    // toggle between signIn and signOut
    function changeTo(option){
        if (option === "signIn"){
            return setHasAccount(true)
        } else if (option === "signUp"){
            return setHasAccount(false);
        } else return;
    }
    

    return hasAccount ? <SignIn toggle={ changeTo }/> : <SignUp toggle={changeTo}/>
}