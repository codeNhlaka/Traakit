import { useContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Documents from "./pages/documents";
import Applications from "./pages/applications";
import { isMobile } from "react-device-detect"; 
import { useStore } from "./store/store";
import { IndexContext } from "./context/index";
import ProfileSettings from "./components/profile-settings/profile_setting.component"
import Login from "./pages/login";
import Spinner from './components/loader/spinner';

function App() {
  const startProcessing = useStore(state => state.startProcessing);
  const stopProcessing = useStore(state => state.stopProcessing);
  const [app, setApp] = useState(false);
  const { settings } = useContext(IndexContext);
  const user = useStore(state => state.about);
  const { processing } = user;
  const setId = useStore(state => state.setId);

  useEffect(() => {
      async function getAuthenticatedUser(){
        // get user id, if none exists in global state
        let id;

        try {
            
          setTimeout(async () => {
              let authenticatedUser = await Auth.currentAuthenticatedUser();
              
              if (authenticatedUser){
                  id = authenticatedUser["attributes"]["custom:userId"];
                  
                  // set id to global
                  setId(id);
                  setApp(true);
                  return stopProcessing();
                } 
            }, 1000);

        } catch(error){
            console.log(error);
            return stopProcessing()
        }
    }

    if (!user.id){
        // on load set spinner 
        startProcessing();
        getAuthenticatedUser();
    }
  }, [startProcessing, stopProcessing])
 
  if (isMobile){
    return <></> // no mobile support for now
  } else {
    if (app){
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
          processing ? <Spinner/> : <Login/>
      )
    }
  }
}


export default App;
