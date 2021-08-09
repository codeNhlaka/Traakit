import { Link } from "react-router-dom";

const UserDetails = () => (
    <div>
        <div className="thumbnail-ring">
            <div className="thumbnail"></div>
        </div>
        <div className="username">Seanly Jackson</div>
    </div>
);

const DashboardOptions = () => (
    <div>
        <ul>
            <li>Dashboard</li>
            <li>Applications</li>
            <li>Notifications</li>
            <li>Documents</li>
        </ul>
    </div>
)


function SignOutSection(){
    async function signOut(){
        await AuthAPI.signOut();
        return props.confirmSignOut();
      }

    return (
        <div>
            <p>Sign Out Section</p>
        </div>
    )
}

function Navigation(){
    return (
        <div>
            <UserDetails/>
            <DashboardOptions/>
            <SignOutSection/>
        </div>
    )
}

export default Navigation;