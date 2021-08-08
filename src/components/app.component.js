import AuthAPI from "../api/auth";
import Navigation from "./app/nagivation.component";

export function DashboardComponent(props) {
  async function signOut(){
    await AuthAPI.signOut();
    return props.confirmSignOut();
  }

  return (
    <div>
      <Navigation/>
    </div>
  )
}
