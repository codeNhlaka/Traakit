import { useEffect, useState } from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/app/dashboard";
import Notifications from "./containers/app/notifications";
import Documents from "./components/app/documents.component";
import Applications from "./containers/app/applications";
import HandleAuthentication from "./components/auth.component";
import ProfileSettings from "./components/app/profile_setting.component";
import AuthAPI from "./api/auth";
import { isMobile } from "react-device-detect"; 
import { authConfirmationContext, profileSettingsContext } from "./appContext";


function App() {
  const [profileSettingsVisible, setProfileSettings] = useState(false);
  const [user, setUser] = useState(true);
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

  // Check if the current user is authenticated then renders the Dashboard
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
          return setUser(false);
        }

        return setUser(true);
      } 
    } 
    
    // getCurrentAuthenticatedUser(); 
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
                <Route path="/notifications">
                  <Notifications/>
                </Route>
              </Switch>
          </Router>
        </profileSettingsContext.Provider>
      )
    } else {
      return (
        <authConfirmationContext.Provider value={ confirmAuthentication }>
          <HandleAuthentication/>
        </authConfirmationContext.Provider>
      )
    }
  }
}

export default App;
