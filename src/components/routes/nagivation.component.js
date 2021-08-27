import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "../../assets/icons/settings.icon";
import DashboardIcon from "../../assets/icons/dashboard.icon";
import ApplicationsIcon from "../../assets/icons/applications.icon";
import UserProfileIcon from "../../assets/icons/userProfile.icon";
import NotificationsIcon from "../../assets/icons/notifications.icon";
import DocumentsIcon from "../../assets/icons/documents.icon";
import { profileSettingsContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/store";
import { API, Storage } from "aws-amplify";
import * as queries from "../../graphql/queries";
import "./styles.css";


function UserDetails(){
    const toggleProfileSettings = useContext(profileSettingsContext);
    const setImageKey = useStore(state => state.setImageKey);
    const setImageUrl = useStore(state => state.setImageUrl); 

    const user = useStore(state => state.about);

    useEffect(() => {
        async function getUserImage(){
            const userImage = await API.graphql({ query: queries.getUserImage, variables: { id: user.id }});
            
            if (userImage.data.getUserImage){
                let { id, key } = userImage.data.getUserImage;  
                
                // set keys
                setImageKey(id, key);

                // get signedUrl
                let signedURL = await Storage.get(key);

                // setUrl
                return setImageUrl(signedURL);
            }
        }

        if (user.id && !user.imageKey.url){
            // attempt to create signedUrl for userImage
            getUserImage();
        }
    }, []);

    return (
        <div className='container h-1/5 mt-10'>
            <div className="user_details container cursor-default flex justify-center items-center h-2/4">
                <div className="profile_image container flex justify-center items-center w-4/5 h-full">
                    <div className="profile_image_wrapper container flex justify-center items-center h-full w-11">
                        <div className="image_container overflow-hidden flex justify-center items-center container bg-coolgray rounded-full h-10 w-10">
                            { user.imageKey.key ? (
                                <img src={ user.imageKey.url } width="100%"/>
                            ) : (
                                <UserProfileIcon/>
                            )}
                        </div>
                    </div>
                    <div className="username container ml-2 w-auto "><p className='text-white select-none'>Oleg Fakeev</p></div>
                </div>
            </div>

            <div onClick={() => toggleProfileSettings() } className="container cursor-pointer flex justify-center items-center h-2/4 max-w-full">
                <div className="bg-selectgreen rounded-md hover:bg-selectgreenhover transition flex items-center text-white w-4/5 h-10">
                    <div className="btn_icon flex justify-center items-center container h-full w-11 ml-5 ">
                        <SettingsIcon/>
                    </div>
                    <p className="w-28 ml-1 select-none pointer-events-none">Edit Profile</p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    active: {
        color: '#30cf43',
    },
    inactive: {
        color: '#fff'
    }
}

function DashboardOptions(props){
    const { activePathname } = props;

    function isActivePath(path){
        if (path === activePathname) return true
        return false;
    }

    return (
        <div className="mt-10">
            <div className="navigationOptions">
                <div className="navigationOption mb-4 flex justify-start items-center w-full h-10">
                    <div className="icon flex justify-center items-center h-full w-10 ml-5">
                        <DashboardIcon iconColor={isActivePath('/') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/') ? styles.active : styles.inactive} className="text-white ml-2 select-none" to="/">Dashboard</Link>
                </div>
    
                <div className="navigationOption mb-4 flex justify-start items-center w-full h-10">
                    <div className="icon flex justify-center items-center h-full w-10 ml-5">
                        <ApplicationsIcon iconColor={isActivePath('/applications') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/applications') ? styles.active : styles.inactive} className="text-white ml-2 select-none" to="/applications">Applications</Link>
                </div>
    
                {/* <div className="navigationOption mb-4 flex justify-start items-center w-full h-10">
                    <div className="icon flex justify-center items-center h-full w-10 ml-5">
                        <NotificationsIcon iconColor={isActivePath('/notifications') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/notifications') ? styles.active : styles.inactive} className="text-white ml-2 select-none" to="/notifications">Notifications</Link>
                </div> */}
    
                <div className="navigationOption mb-4 flex justify-start items-center w-full h-10">
                    <div className="icon flex justify-center items-center h-full w-10 ml-5">
                        <DocumentsIcon iconColor={isActivePath('/documents') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/documents') ? styles.active : styles.inactive} className="text-white ml-2 select-none" to="/documents">Documents</Link>
                </div>
            </div>
        </div>
    )
}


function Navigation(){
    const location = useLocation();
    return (
        <div className='container absolute border-r border-gray-800 border-opacity-50 z-50 h-screen w-1/5'>
            <UserDetails/>
            <DashboardOptions activePathname={location.pathname}/>
        </div>
    )
}

export default Navigation;