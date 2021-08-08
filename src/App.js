import { useEffect, useState } from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import HandleAuthentication from "./components/auth.component";
import AuthAPI from "./api/auth";

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

  return (
    <Router>
       <Switch>
          <Route exact path="/">
            { user ? <Dashboard confirmSignOut={confirmSignOut} /> : <HandleAuthentication confirmAuthentication={ confirmAuthentication }/>}
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
