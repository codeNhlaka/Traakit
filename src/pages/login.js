import { useState, useEffect } from 'react';
import AuthAPI from "../adapters/auth";
import { useStore } from '../store/store';
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { v4 as uuidv4 } from "uuid";
import create from "zustand";

const initialLocalState = {
  userVerified: true,
  username: null,
  passwordChangeEventTriggered: false,
  requireLogin: false
}

const useLocalStore = create(set => ({
  accountState: initialLocalState,
  passwordChangeEventTrigger: (val) => set(state => ({
      accountState: {
        ...state.accountState,
        passwordChangeEventTriggered: val
      }
  })),
  setVerificationState: (verified) => set(state => ({
      accountState: {
        ...state.accountState,
        userVerified: verified
      }
  })),
  setUsername: (username) => set(state => ({
    accountState: {
      ...state.accountState,
      username
    }
  })),
  setLogin: () => set(state => ({
    accountState: {
      ...state.accountState,
      requireLogin: true
    }
  }))
}));

const ChangePassword = ({ setCode, handlePasswordChange, changePassword, isSubmiting, error}) => (
  <div className="flex items-center justify-center w-screen h-screen bg-selectgray">
    <div className="flex justify-center w-1/2 h-3/4">
      <div className="w-1/2 h-full">
        <h1 className="flex items-center justify-center w-full h-auto p-5 text-white">Change Password</h1>
        <input onChange={e => setCode(e.target.value) } className="w-full px-4 mt-5 h-9" type="text" placeholder="Verification code"/>
        <input onChange={e => handlePasswordChange(e) } className="w-full px-4 mt-2 h-9" type="password" placeholder="New password"/>
        <input onClick={ () => changePassword() } className="flex items-center justify-center w-full px-4 mt-2 text-white cursor-pointer bg-selectgreen hover:bg-selectgreenhover h-9" type="submit" value="Submit"/>
        {isSubmiting === true ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Changing password...</h1> : null}
        {error.state ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">{ error.message }</h1> : null}
      </div>
    </div>
  </div>
)


const SetUsername = ({ submitUsername, handleUsernameChange, isSubmiting }) => (
  <div className="flex items-center justify-center w-screen h-screen bg-selectgray">
    <div className="flex justify-center w-1/2 h-3/4">
      <div className="w-1/2 h-full">
        <h1 className="flex items-center justify-center w-full h-auto p-5 text-white">Forgot Password</h1>
        <input onChange={e => handleUsernameChange(e) } className="w-full px-4 mt-5 h-9" type="text" placeholder="Username"/>
        <input onClick={ () => submitUsername() } className="flex items-center justify-center w-full px-4 mt-2 text-white cursor-pointer bg-selectgreen hover:bg-selectgreenhover h-9" type="submit" value="Submit"/>
        {isSubmiting === true ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Sending verification code...</h1> : null}
      </div>
    </div>
  </div>
)

function Password(){
  const passwordChangeEventTrigger = useLocalStore(state => state.passwordChangeEventTrigger);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [submittedUsername, setSubmitted] = useState(false);
  const [isSubmiting, setIsSubmitting] = useState(false);

  const [error, setError] = useState({
    state: false,
    message: null
  });

  const [code, setCode] = useState(null);

  function handleUsernameChange(e){
    setUsername(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value);
  }

  async function submitUsername(){
    setIsSubmitting(true);
    const payload = await AuthAPI.forgotPassword(username);
    
    if (payload){
      setIsSubmitting(false);
      const { CodeDeliveryDetails } = payload;
      if (CodeDeliveryDetails["Destination"]) setSubmitted(true);
    }

    return setIsSubmitting(false);
  }

  async function changePassword(){
    const proceed = (code && username && password) ? true : false;
    
    if (proceed){
      setIsSubmitting(true);
      const newPassword = await AuthAPI.setNewPassword(username, code, password);

      if (newPassword && newPassword === "SUCCESS"){
        setIsSubmitting(false);
        return passwordChangeEventTrigger(false);
      }

      setIsSubmitting(false);
      return setError({
        state: true,
        message: newPassword
      });
    }
  }

  return (submittedUsername) ? (
      <ChangePassword 
        changePassword={ changePassword } 
        handlePasswordChange={handlePasswordChange} 
        setCode={ setCode } 
        isSubmiting={ isSubmiting }
        error={ error }

        /> ) : ( 
      <SetUsername 
        isSubmiting={ isSubmiting } 
        handleUsernameChange={ handleUsernameChange } 
        submitUsername={ submitUsername }
      /> )
}

function Prompt({ username }){
  const [verifying, setVerifying] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [code, setCode] = useState(null);
  const [error, setError] = useState({
    state: false,
    message: null
  });
  const setVerificationState = useLocalStore(state => state.setVerificationState);
  const setLogin = useLocalStore(state => state.setLogin);
  
  async function resendVerification(){
    setSendingCode(true);
    console.log(username)
    const code = await AuthAPI.resendConfirmationCode(username);
    if (code && typeof code === "boolean"){
      setSendingCode(false);
    }
  }

  function handleChange(e){
    setCode(e.target.value);
  }

  async function handleSubmit(){
    setVerifying(true);
    if (code && username){
      const verified = await AuthAPI.confirmSignUp(username, code);
      if (verified){        
        if (typeof verified === "boolean" && verified === true){
          setVerificationState(true);
          setLogin();
        } else {
          setVerifying(false);
          setError({
            state: true,
            message: verified
          });
          
        }
      }
    }
  }
  
  return (
    <div className="flex items-center justify-center w-screen h-full bg-selectgray">
        <div className="flex justify-center w-1/2 h-3/4">
          <div className="w-1/2 h-full">
            <h1 className="flex items-center justify-center w-full h-auto p-5 text-white">Verify your account</h1>
            <h1 className="flex items-center justify-center w-full h-auto p-5 text-sm text-white">Verification code is sent to your email</h1>
            <input onChange={e => handleChange(e) }className="w-full px-4 mt-5 h-9" type="text" placeholder="Verification code"/>
            <input onClick={ () => handleSubmit() } className="flex items-center justify-center w-full px-4 mt-2 text-white cursor-pointer bg-selectgreen hover:bg-selectgreenhover h-9" type="submit" value="continue"/>
            <input onClick={ () => resendVerification() } className="flex items-center justify-center w-full px-4 mt-2 text-sm text-white bg-transparent cursor-pointer h-9" type="submit" value="Resend code"/>
            {verifying ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Verifying your account...</h1> : null}
            {sendingCode ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Resending verification code...</h1> : null}
            {error.state ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">{ error.message }</h1> : null}
          
          </div>
        </div>
    </div>
  )
}

const SignIn = ({ handleUsername, handlePassword, signingIn, error, authMode, signIn, forgotPassword}) => (
  <div className="flex items-center justify-center w-1/2 h-3/4 ">
    <div className="w-3/6 h-full">
        <h1 className="flex justify-center w-full h-auto text-lg text-white select-none">Traakit v0.1-apha</h1>
        <div className="w-full h-auto">
            <input onChange={e => handleUsername(e)} className="w-full px-4 mt-10 h-9" type="text" placeholder="Username"/>
            <input onChange={e => handlePassword(e)} className="w-full px-4 mt-2 h-9" type="password" placeholder="Password"/>
            <input onClick={ () => signIn() } className="flex items-center justify-center w-full px-4 mt-2 text-white cursor-pointer bg-selectgreen hover:bg-selectgreenhover h-9" type="submit" value="continue"/>
            <input onClick={ () => forgotPassword() } className="flex items-center justify-center w-full px-4 mt-2 text-sm text-gray-700 bg-transparent cursor-pointer h-9" type="submit" value="forgot password"/>
            <input onClick={ () => authMode() } className="flex items-center justify-center w-full px-4 mt-2 text-white border border-gray-800 cursor-pointer bg-coolgray h-9" type="submit" value="create account"/>
        </div>
        {signingIn === true ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Signing you in...</h1> : null}
        {error === true ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Incorrect email or password</h1> : null}

    </div>
  </div>
)

export default function Login(){
    const setId = useStore(state => state.setId);
    const setName = useLocalStore(state => state.setUsername);
    const accountState = useLocalStore(state => state.accountState);
    const { requireLogin } = accountState;
    const setVerificationState = useLocalStore(state => state.setVerificationState);
    const passwordChangeEventTrigger = useLocalStore(state => state.passwordChangeEventTrigger);
    const { userVerified } = accountState;
    const { passwordChangeEventTriggered } = accountState;
    const [login, setLogin] = useState(true);
    const [error, setError] = useState(false);
    const [signingIn, setSignIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const updateAbout = useStore(state => state.updateAbout);


    function reset(){
      setError(false);
      setSignIn(false);
    }

    function authMode(){
      reset();
      setLogin(!login);
    }
    
    function forgotPassword(){
      passwordChangeEventTrigger(true);      
    }
    
    function handleUsername(e){
        setUsername(e.target.value);
        reset();
    }

    function handlePassword(e){
        setPassword(e.target.value);
        reset();
    }

    function handleEmail(e){
      setEmail(e.target.value);
      reset();
    }

    async function signUp(){
      reset()

      if (username && email && password){
        setSignIn(true);
        const userId = uuidv4();

        const user = await AuthAPI.signUp(username, password, email, userId);
        if (user){
          reset();

          const { username } = user; 
          
          if (username){
            setName(username);
            return setVerificationState(false);
          } else {
            return setError(true);
          }

        }
      }
    }

    async function signIn(){
        reset();
        setSignIn(true);
        if (!username && !password) {
            setSignIn(false);
            return setError(true);
        }

        const user = await AuthAPI.signIn(username, password);
        if (user) {
           if (typeof user === "string" && user !== "User is not confirmed."){
              reset();
              return setError(true);
           } else if (user === "User is not confirmed."){
             reset();
             return setVerificationState(false);
           }

            const authenticatedUser = await AuthAPI.getCurrentAuthenticatedUser();
            if (authenticatedUser){
                // no current authenticated user
                  if (typeof authenticatedUser === "string"){
                    console.log('no authenticaaaated user');
                    return
                  } else {
                    // get user id
                    const userId = authenticatedUser.attributes['custom:userId'];
                    console.log(authenticatedUser)
                    let userAbout;
          
                    // fetch user data
                    try {
                       let recordedData = await API.graphql({ query: queries.getUser, variables: { id: userId }});
          
                       if (recordedData.data.getUser){
                          userAbout = recordedData;
                       } else {
                         userAbout = null;
                       }
                    } catch(error){
                      console.log(error);
                    }
              
                    if (userAbout){
                      // get required data and then update state
                    
                      const { employmentStatus, fullnames, skill } = userAbout.data.getUser;
                      
                      const fetchedData = {
                        id: userId,
                        employmentStatus, 
                        fullnames, 
                        skill
                      }
          
                      // updateState
                      updateAbout(fetchedData);
                      setSignIn(false);
                    } else {
                      // only set id
                      setId(userId);
                    }
                  }
                } 
        }
    }

    if ( passwordChangeEventTriggered ){
      return <Password/>
    }

    if (requireLogin || login){
      return (
        <div className="flex items-center justify-center w-screen h-screen bg-selectgray">
          { userVerified ? ( <SignIn
              handleUsername={ handleUsername }
              handlePassword={ handlePassword }
              signingIn={ signingIn } 
              error={ error }
              authMode={ authMode }
              signIn={ signIn } 
              forgotPassword={ forgotPassword }
           /> ) : <Prompt username={username} />}
        </div>
      )
    }

    return(
      <div className="flex items-center justify-center w-screen h-screen bg-selectgray">
          { userVerified ? ( 
            <div className="flex items-center justify-center w-1/2 h-3/4 ">
                <div className="w-3/6 h-full">
                    <h1 className="flex justify-center w-full h-auto text-lg text-white select-none">Traakit v0.1-apha</h1>
                    <div className="w-full h-auto">
                        <input onChange={e => handleUsername(e)} className="w-full px-4 mt-10 h-9" type="text" placeholder="Username"/>
                        <input onChange={e => handleEmail(e) } className="w-full px-4 mt-2 h-9" type="email" placeholder="Email"/>
                        <input onChange={e => handlePassword(e)} className="w-full px-4 mt-2 h-9" type="password" placeholder="Password"/>
                        <input onClick={ () => signUp() } className="flex items-center justify-center w-full px-4 mt-2 text-white cursor-pointer bg-selectgreen hover:bg-selectgreenhover h-9" type="submit" value="continue"/>
                        <input onClick={ () => authMode() } className="flex items-center justify-center w-full px-4 mt-2 text-white border border-gray-800 cursor-pointer bg-coolgray h-9" type="submit" value="already a member"/>
                    </div>
                    {signingIn ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Createing your account...</h1> : null}
                    {error ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Username already taken or email format is incorrect</h1> : null}
                </div>
            </div>
          ) : (
            <Prompt username={username}/>
          )}
      </div>
    )
}

