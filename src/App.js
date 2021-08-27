import { useEffect, useState } from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard.component";
import Documents from "./components/documents/documents.component";
import Applications from "./components/applications/applications.component";
import ProfileSettings from "./components/app/profile_setting.component";
import AuthAPI from "./adapters/auth";
import { isMobile } from "react-device-detect"; 
import { authConfirmationContext, profileSettingsContext } from "./context/appContext";
import AuthenticateUser from "./components/authentication/authUser.component";

function App() {
  const [profileSettingsVisible, setProfileSettings] = useState(false);
  const [user, setUser] = useState(false);
  const noAuthenticatedUserMessage = "The user is not authenticated";

  /**
   * Displays the profile settings component
   * @returns sets the state to the toggle value
   */
  function toggleProfileSettings(){
    return setProfileSettings(!profileSettingsVisible);
  }

  // Set user to false then render the Authentication component;
  function confirmSignOut(){
    setUser(false);
  }

  // Check if the current user is authenticated 
  async function confirmAuthentication(){
    const isAuthenticated = await AuthAPI.getCurrentAuthenticatedUser();
    if (isAuthenticated && isAuthenticated['username']){
          return setUser(true);
    } 
    
    return;
  }
  
  useEffect(() => {
    async function getCurrentAuthenticatedUser(){
      const authenticatedUser = await AuthAPI.getCurrentAuthenticatedUser();
      if (authenticatedUser){
        if (authenticatedUser === noAuthenticatedUserMessage){
          // fetch user data
          // update state
          
          return setUser(false);
        }

        return setUser(true);
      } 
    } 
    
    getCurrentAuthenticatedUser(); 
  }, []);
  
  if (isMobile){
    return <></> // no mobile support for now
  } else {
    if (user){
      return (
        <profileSettingsContext.Provider value={ toggleProfileSettings }>
          {profileSettingsVisible ? <ProfileSettings/> : null}
          <Router>
            <Switch>
                <Route exact path="/">
                  <Dashboard/> 
                </Route>
                <Route path="/applications">
                  <Applications/>
                </Route>
                <Route path="/documents">
                  <Documents/>
                </Route>
              </Switch>
          </Router>
        </profileSettingsContext.Provider>
      )
    } else {
      return (
        <authConfirmationContext.Provider value={ confirmAuthentication }>
          <AuthenticateUser/>
        </authConfirmationContext.Provider>
      )
    }
  }
}

export default App;
