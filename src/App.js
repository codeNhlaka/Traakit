import "./css/global/global.css";
import { useEffect, useState } from "react";
import Dashboard from "./containers/dashboard";
import SignIn from "./components/SignIn";
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
    // check if user is authenticated 
    getUser();
  }, [])

  if (user){
    return (
      <div className="App">
        <Dashboard/>
      </div>
    );
  } else {
    return (
      <div className="App">
        {/* <SignIn/> */}
        <HandleAuthentication/> 
      </div>
    );
  }
}

export default App;
