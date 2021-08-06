import { useEffect, useState } from "react";
import {  BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import HandleAuthentication from "./components/auth.component";
import AuthAPI from "./api/auth";

function App() {
  const [user, setUser] = useState(false);
  const noAuthenticatedUserMessage = "The user is not authenticated";
  
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

    getUser(); // check if user is authenticated;
  }, []);

  return (
    <Router>
       <Switch>
          <Route exact path="/">
            { user ? <Dashboard/> : <HandleAuthentication/>}
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
