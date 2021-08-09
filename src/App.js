import { useEffect, useState } from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/app/dashboard";
import Notifications from "./containers/app/notifications";
import Documents from "./components/app/documents.component";
import Applications from "./containers/app/applications";
import HandleAuthentication from "./components/auth.component";
import AuthAPI from "./api/auth";

// confirmSignOut={confirmSignOut} 

function App() {
  const [user, setUser] = useState(true);
  const noAuthenticatedUserMessage = "The user is not authenticated";

  function confirmSignOut(){
    setUser(false);
  }

  async function confirmAuthentication(){
    // check if the user is authenticated
    // then render the dashboard
    return setUser(true);
  }
  
  useEffect(() => {
    async function getUser(){
      const authenticatedUser = await AuthAPI.getCurrentAuthenticatedUser();
      if (authenticatedUser){
        if (authenticatedUser === noAuthenticatedUserMessage){
          return setUser(false);
        }

        return setUser(true);
      } 
    } 
    // getUser(); // check if user is authenticated;
  }, []);
  if (user){
    return (
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
    )
  } else return <HandleAuthentication confirmAuthentication={ confirmAuthentication }/>
}

export default App;
