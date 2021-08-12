import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthAPI from "../../api/auth";
import SettingsIcon from "../../assets/icons/settings.icon";
import { profileSettingsContext } from "../../appContext";

function UserDetails(){
    const toggleProfileSettings = useContext(profileSettingsContext);

    return (
        <div className='container h-1/5 mt-10'>
            <div className="user_details container cursor-default flex justify-center items-center h-2/4">
                <div className="profile_image container flex justify-center items-center w-4/5 h-full">
                    <div className="profile_image_wrapper container flex justify-center items-center h-full w-11">
                        <div className="image_container container bg-coolgray rounded-full h-10 w-10"></div>
                    </div>
                    <div className="username container ml-2 w-auto "><p className='text-white'>Sharon Jackson</p></div>
                </div>
            </div>

            <div onClick={() => toggleProfileSettings() } className="container cursor-pointer flex justify-center items-center h-2/4 max-w-full">
                <div className="bg-selectgreen hover:bg-selectgreenhover transition flex items-center rounded-md text-white w-4/5 h-11">
                    <div className="btn_icon flex justify-center items-center container h-full w-11 ml-5 ">
                        <SettingsIcon/>
                    </div>
                    <p className="w-28 ml-1 pointer-events-none">Edit Profile</p>
                </div>
            </div>
        </div>
    )
}

const DashboardOptions = () => (
    <div className="mt-10">
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


function Navigation(){
    return (
        <div className='container absolute border-r border-gray-800 border-opacity-50 z-50 h-screen w-1/5'>
            <UserDetails/>
            {/* <DashboardOptions/> */}
        </div>
    )
}

export default Navigation;