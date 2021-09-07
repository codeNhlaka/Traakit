import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "../../assets/icons/settings.icon";
import DashboardIcon from "../../assets/icons/dashboard.icon";
import ApplicationsIcon from "../../assets/icons/applications.icon";
import UserProfileIcon from "../../assets/icons/userProfile.icon";
import DocumentsIcon from "../../assets/icons/documents.icon";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/store";
import { API, Storage } from "aws-amplify";
import * as queries from "../../graphql/queries";
import TraakitLogo from "../../assets/logo/Traakit";
import { IndexContext } from "../../context/index";

function UserDetails(){
    const { viewThisModal } = useContext(IndexContext);
    const user = useStore(state => state.about);
    const setImageKey = useStore(state => state.setImageKey);
    const setImageUrl = useStore(state => state.setImageUrl); 
    const [displayName, setDisplayName] = useState(user.data.fullnames || "[Your Name]");


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
        <div className='container mt-10 h-1/5'>
            <div className="container flex items-center justify-center cursor-default user_details h-2/4">
                <div className="container flex items-center justify-center w-4/5 h-full profile_image">
                    <div className="container flex items-center justify-center h-full profile_image_wrapper w-11">
                        <div className="container flex items-center justify-center w-10 h-10 overflow-hidden rounded-full image_container bg-coolgray">
                            { user.imageKey.key ? (
                                <img src={ user.imageKey.url } style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover"
                                }}/>
                            ) : (
                                <UserProfileIcon/>
                            )}
                        </div>
                    </div>
                    <div className="container w-auto ml-2 username "><p className='text-white select-none'>{ displayName }</p></div>
                </div>
            </div>

            <div onClick={() => viewThisModal("settings") } className="container flex items-center justify-center max-w-full cursor-pointer h-2/4">
                <div className="flex items-center w-4/5 h-10 text-white transition rounded-md bg-selectgreen hover:bg-selectgreenhover">
                    <div className="container flex items-center justify-center h-full ml-5 btn_icon w-11 ">
                        <SettingsIcon/>
                    </div>
                    <p className="ml-1 pointer-events-none select-none w-28">Edit Profile</p>
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
                <div className="flex items-center justify-start w-full h-10 mb-4 navigationOption">
                    <div className="flex items-center justify-center w-10 h-full ml-5 icon">
                        <DashboardIcon iconColor={isActivePath('/') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/') ? styles.active : styles.inactive} className="ml-2 text-white select-none" to="/">Dashboard</Link>
                </div>
    
                <div className="flex items-center justify-start w-full h-10 mb-4 navigationOption">
                    <div className="flex items-center justify-center w-10 h-full ml-5 icon">
                        <ApplicationsIcon iconColor={isActivePath('/applications') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/applications') ? styles.active : styles.inactive} className="ml-2 text-white select-none" to="/applications">Applications</Link>
                </div>
    
                {/* <div className="flex items-center justify-start w-full h-10 mb-4 navigationOption">
                    <div className="flex items-center justify-center w-10 h-full ml-5 icon">
                        <NotificationsIcon iconColor={isActivePath('/notifications') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/notifications') ? styles.active : styles.inactive} className="ml-2 text-white select-none" to="/notifications">Notifications</Link>
                </div> */}
    
                <div className="flex items-center justify-start w-full h-10 mb-4 navigationOption">
                    <div className="flex items-center justify-center w-10 h-full ml-5 icon">
                        <DocumentsIcon iconColor={isActivePath('/documents') ? styles.active.color : styles.inactive.color }/>
                    </div>
                    <Link style={isActivePath('/documents') ? styles.active : styles.inactive} className="ml-2 text-white select-none" to="/documents">Documents</Link>
                </div>
            </div>
        </div>
    )
}


function Navigation(){
    const location = useLocation();
    return (
        <div className='container absolute z-50 w-1/5 h-screen border-r border-gray-800 border-opacity-50'>
            <UserDetails/>
            <DashboardOptions activePathname={location.pathname}/>
            <div className="absolute bottom-0 w-full mb-5 transition-all cursor-pointer hover:bg-coolgray h-14">
                <div className="flex items-center justify-center h-full ml-5 w-14">
                    <TraakitLogo/>
                </div>
            </div>
        </div>
    )
}

export default Navigation;