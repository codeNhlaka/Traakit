import { useContext } from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Documents from "./pages/documents";
import Applications from "./pages/applications";
import { isMobile } from "react-device-detect"; 
import { useStore } from "./store/store";
import { IndexContext } from "./context/index";
import ProfileSettings from "./components/profile-settings/profile_setting.component"
import Login from "./pages/login";

function App() {
  const { settings } = useContext(IndexContext);
  const user = useStore(state => state.about);
 
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
          <Login />
      )
    }
  }
}

export default App;
