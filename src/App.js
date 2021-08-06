import { useEffect, useState } from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import SignIn from "./components/SignIn";
import HandleAuthentication from "./components/auth.component";
import AuthAPI from "./api/auth";


// if (user){
//   return (
//     <div className="App">
//       <Dashboard/>
//     </div>
//   );
// } else {
//   return (
//     <div className="App">
//       <HandleAuthentication/> 
//     </div>
//   );
// }

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
          <Route path="/authentication/:action">
            <HandleAuthentication />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
