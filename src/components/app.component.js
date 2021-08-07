import AuthAPI from "../api/auth";

export function DashboardComponent(props) {
  async function signOut(){
    await AuthAPI.signOut();
    return props.confirmSignOut();
  }

  return <div>
    <h1>Welcome to the dashboard</h1>
    <button onClick={() => signOut()}>Sign Out</button>
  </div>;
}
