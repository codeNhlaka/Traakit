import { useState } from 'react';
import AuthAPI from "../adapters/auth";
import { useStore } from '../store/store';
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
            
export default function Login(){
    const [error, setError] = useState(false);
    const [signingIn, setSignIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const updateAbout = useStore(state => state.updateAbout);

    function handleUsername(e){
        setUsername(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    async function handleSubmit(){
        setSignIn(true);
        if (!username && !password) {
            return setError(true);
        }

        const user = await AuthAPI.signIn(username, password);
        if (user) {
            const authenticatedUser = await AuthAPI.getCurrentAuthenticatedUser();
            if (authenticatedUser){
                  
                // no current authenticated user
                  if (typeof authenticatedUser === "string"){
                    return
                  } else {
                    // get user id
                    const userId = authenticatedUser.attributes['custom:userId'];
          
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
                      return setSignIn(false);
                    }
                  }
                } 
        }
    }


    return (
        <div className="flex items-center justify-center w-screen h-screen bg-selectgray">
            <div className="flex items-center justify-center w-1/2 h-3/4 ">
                
                <div className="w-3/6 h-full">
                    <h1 className="flex justify-center w-full h-auto text-lg text-white select-none">Traakit v0.1-apha</h1>
                    <div className="w-full h-auto">
                        <input onChange={e => handleUsername(e)} className="w-full px-4 mt-10 h-9" type="email" placeholder="Username"/>
                        <input onChange={e => handlePassword(e)} className="w-full px-4 mt-2 h-9" type="password" placeholder="Password"/>
                        <input onClick={ () => handleSubmit() } className="flex items-center justify-center w-full px-4 mt-2 text-white cursor-pointer bg-selectgreen hover:bg-selectgreenhover h-9" type="submit" />
                    </div>
                    {signingIn ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Signing you in...</h1> : null}
                    {error ? <h1 className="flex justify-center w-full h-auto mt-10 text-sm text-white select-none">Incorrect email or password</h1> : null}

                </div>

            </div>
        </div>
    )
}

