import { Link } from "react-router-dom";
import AuthAPI from "../../api/auth";

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
            <Link to="/">
                <li>Dashboard</li>
            </Link>
            <Link to="/applications">
                <li>Applications</li>
            </Link>
            <Link to="/notifications">
                <li>Notifications</li>
            </Link>
            <Link to="/documents">
                <li>Documents</li>
            </Link>
        </ul>
    </div>
)


function SignOutSection(props){
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