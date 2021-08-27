import { useState, useContext, useEffect, createRef } from "react";
import { profileSettingsContext } from "../../context/appContext";
import Select from "../form/dropdown.component";
import { ContainedInputField } from "../form/input.component";
import LogoutIcon from "../../assets/icons/logout.icon";
import { UserDetailsAPI } from "../../adapters/userDetails";
import AccountIcon from "../../assets/icons/account.icon";
import { v4 as uuidv4 } from 'uuid';
import { AmplifyS3Image } from "@aws-amplify/ui-react";
import { Storage } from "aws-amplify";
import { useStore } from "../../store/store";

const componentP = {
    x: 100,
    y: 70
};

function ProfileSettingsComponent(props){
    let fileInputRef = createRef(null);
    const user = useStore(state => state.about);
    const setImageKey = useStore(state => state.setImageKey);

    const [ alteredDetails, alterDetails ] = useState({
        fullnames: null,
        skill: null,
        status: null
    })
 
    // hide component context
    const toggleProfileSettings = useContext(profileSettingsContext);

    const [componentPosition, setComponentPosition] = useState(componentP);

    function updateUserInformation(){

    }

    async function createUserInformation(){
        if (!user.id){
            const data = {
                ...alteredDetails,
            }

            const { user } = await UserDetailsAPI.createUserInformation(alteredDetails);
        
            if (user){
                const {
                    id,
                    fullnames,
                    employmentStatus,
                    skill,
                    imageKey
                } = user;

                console.log('created user ', user);
    
                // update state
            }
        }
    }

    function handleInfomationUpdate(){
        // const { id } = userDetails;
        
        // if id exists, update user information else create infomation
        // return id ? updateUserInformation() : createUserInformation();
    }

    async function handleImage(e){
        const { files } = e.target;
        const image = files[0];

        // generate key
        const key = uuidv4();

        // get current image 
        Storage.list('')
        .then( imageList => {

            // if there's an existing image, remove it
            if (imageList.length){
                let i;
                
                for(i = 0; i <= imageList.length - 1; i++){
                    // get image key
                    const { key } = imageList[i];
                    
                    // remove current image
                    let removeImageResult = Storage.remove(key);
                }
            } 

            // put image
            Storage.put(key, image)
            .then(data => {

                const { key } = data;
                
                // update state
                
                setImageKey(key);

                // put key in db
                UserDetailsAPI.updateUserImage(key);
            })
            .catch(error => console.log(error))


        })  
        .catch(error => {
            console.log(error);
        })
    }

    function handleFileUpload(){
        fileInputRef.click();
    }

    function handleSignOut(){
        // handle Signout
    }

    function handleChange(forInput, value){
        const property = forInput;
        alterDetails({
            ...alteredDetails,
            [property] : value
        });
    }

    useEffect(() => {
        // fetch required data

    }, [])


    return (
        <div className="container absolute bg-coolgray border border-gray-800 transition shadow-lg ml-auto h-4/5 rounded w-1/3"
            style={
                {
                    top: componentPosition.y,
                    left: componentPosition.x,
                    zIndex: 1000
                }
            }
        >
            <div className="select-none w-16mt-2 w-full h-10 flex items-center justify-end">
                <p onClick={() => toggleProfileSettings() } className="text-white cursor-pointer select-none w-16">close</p>
            </div>
            <div className="user-image-details w-full h-24 flex items-center">
                <div 
                    style={
                        {
                            minWidth: "95px",
                            minHeight: "95px"
                        }
                    }
                    className="user-image-container relative ml-5 flex items-center justify-center overflow-hidden">
                        <div 
                            style={
                                {
                                    width: '90px',
                                    height: '90px',
                                    borderRadius: '2000px'
                                }
                            }
                            className="container overflow-hidden">
                            { user.imageKey.key ? (
                                <AmplifyS3Image imgKey={ user.imageKey.key } />
                            ) : 
                            (
                                <div 
                                    style={
                                        {
                                            width: '90px',
                                            height: '90px',
                                            borderRadius: '2000px'
                                        }
                                    }
                                    className="bg-selectgray flex justify-center items-center">
                                        <AccountIcon />
                                </div>
                            )
                            }
                        </div>
                </div>
                <div className="actions w-56 h-24 ml-2 flex items-center">
                    <input ref={e => fileInputRef = e} onChange={e => handleImage(e)} type="file" hidden/>
                    <button 
                        style={
                                {
                                    width: '80%',
                                    marginLeft: '5%'
                                }
                                } 
                        onClick={ ()=> handleFileUpload() }
                        className="h-10 bg-selectgreen hover:bg-selectgreenhover transition-all rounded-md text-white cursor-pointer"
                    >
                        Change Image
                    </button>
                </div>
            </div>

            <div className="status-container flex items-center w-full h-80">
                <div 
                style={
                    {
                        width: "95%",
                        marginLeft: "2.5%"
                    }
                }
                className="status mt-5 h-full">
                    <div className="content w-full cursor-default h-72">
                        <ContainedInputField handleChange={ handleChange } placeholder="Oleg Fakeev" inputLabel="Fullnames"/>
                        <ContainedInputField handleChange={ handleChange } placeholder="Graphic Designer" inputLabel="Skill"/>
                        
                        <div 
                            style={ {
                            position: 'relative',
                            left: '10%',
                            height: '80px'
                            }}
                            className="company-name w-4/5 mt-2 flex"
                        >
                            <div className="w-full ">
                                <p className="text-gray-400 text-sm">Employement Status</p>
                                <Select options={['Unemployed', 'Employed']} handleChange={ handleChange } />
                            </div>
                        </div>
                        <button 
                                style={
                                    {
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginTop: '5%'
                                    }
                                } 
                                onClick={ ()=> handleInfomationUpdate() }
                                className="h-10 bg-selectgreen hover:bg-selectgreenhover transition-all rounded-md text-white cursor-pointer"
                        >
                            Update Information
                        </button>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default ProfileSettingsComponent;
