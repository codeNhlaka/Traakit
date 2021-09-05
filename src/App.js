import { useEffect, useContext, useState } from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Documents from "./pages/documents";
import Applications from "./pages/applications";
import AuthAPI from "./adapters/auth";
import { isMobile } from "react-device-detect"; 
import { authConfirmationContext } from "./context/appContext";
import AuthenticateUser from "./components/authentication/authUser.component";
import { useStore } from "./store/store";
import * as queries from "./graphql/queries";
import { API } from "aws-amplify";
import { IndexContext } from "./context/index";
import ProfileSettings from "./components/profile-settings/profile_setting.component"

function App() {
  const { settings } = useContext(IndexContext);
  const noAuthenticatedUserMessage = "The user is not authenticated";
  const user = useStore(state => state.about);
  const { applications } = user;
  const setApplicataionRecord = useStore(state  => state.setApplicationRecord);
  const setUserId = useStore(state => state.setId);
  const updateAbout = useStore(state => state.updateAbout);

  // Check if the current user is authenticated 
  async function confirmAuthentication(){
    const isAuthenticated = await AuthAPI.getCurrentAuthenticatedUser();
    
    if (isAuthenticated && isAuthenticated.attributes['custom:userId']){
      const userId = isAuthenticated.attributes['custom:userId'];
      return setUserId(userId);
    } 
    
    return;
  }
  
  useEffect(() => {
      async function fetchUserApplications(){
        const applicationsList = await API.graphql({query: queries.listApplications});
        
        if (applicationsList.data.listApplications){
            
            // get applicaations
            const { items } = applicationsList.data.listApplications;
            
            // push each application to global state
            
            items.forEach(item => {
                const { id } = item;

                // check for duplicates
                if (applications.length !== 0){

                    applications.forEach(currenApplication => {
                        if (currenApplication.id === id) return; 
                    });

                } else {
                    // push each application record to global state;
                    return setApplicataionRecord(item);
                }
            })
        }
    } 

    async function getCurrentAuthenticatedUser(){
      const authenticatedUser = await AuthAPI.getCurrentAuthenticatedUser();
      if (authenticatedUser){
        
        // no current authenticated user
        if (authenticatedUser === noAuthenticatedUserMessage){
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

                fetchUserApplications();
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
            return updateAbout(fetchedData);
          }

          return setUserId(userId);
        }
      } 
    } 
    
    getCurrentAuthenticatedUser();

  }, []);
  
  if (isMobile){
    return <></> // no mobile support for now
  } else {
    if (user.id){
      return (
        <>
          { settings ? <ProfileSettings/> : null}
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
        </>
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
