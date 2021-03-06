import { useContext, useEffect, useState } from "react";
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
import AuthAPI from './adapters/auth';

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
   
        setTimeout(async () => {
            let authenticatedUser = await AuthAPI.getCurrentAuthenticatedUser()
            
            if (authenticatedUser){
              if (typeof authenticatedUser === "string" && authenticatedUser === "The user is not authenticated"){
                setApp(false);
                return stopProcessing();
              }

              id = authenticatedUser["attributes"]["custom:userId"];
              setId(id);
              setApp(true);
              return stopProcessing();
            }
        }, 1000);

    }

    if (!user.id){
        // on load set spinner 
        startProcessing();
        getAuthenticatedUser();
    }
  }, [startProcessing, stopProcessing, setId, user.id])
 
  if (isMobile){
    return <></> // no mobile support for now
  } else {
    if (app || user.id){
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
