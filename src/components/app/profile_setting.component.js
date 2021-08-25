import { useState, useContext, useEffect, createRef } from "react";
import { profileSettingsContext } from "../../context/appContext";
import Select from "../form/dropdown.component";
import { ContainedInputField } from "../form/input.component";
import LogoutIcon from "../../assets/icons/logout.icon";
import { UserDetailsAPI } from "../../adapters/userDetails";
import { v4 as uuidv4 } from 'uuid';


function ProfileSettingsComponent(props){
    let fileInputRef = createRef(null);
    const [userImage, setImage] = useState(true);
    const [status] = useState(['Unemployed', 'Employed']);
    
    const [userDetails, setUserDetails] = useState({
        fullnames: null,
        category: null,
        status: null
    });

    const [componentPosition, setComponentPosition] = useState({
        x: 100,
        y: 70
    });

    async function handleImage(e){
        const { files } = e.target;
        const image = files[0];

        // generate key
        const key = uuidv4()

        // upload image
        const result = await UserDetailsAPI.setUserImage(image, key);

        if (result){
            console.log(result);
        }

        
    }

    function handleFileUpload(){
        fileInputRef.click();
    }

    function handleSignOut(){
        // handle Signout
    }

    function updateUserDetails(){
        // Handle update
    }

    function handleChange(forInput, value){
        const property = forInput;
        setUserDetails({
            ...userDetails,
            [property] : value
        });
    }

    // hide component context
    const toggleProfileSettings = useContext(profileSettingsContext);

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
                            minWidth: "60px",
                            minHeight: "60px"
                        }
                    }
                    className="user-image-container relative ml-5 flex items-center">
                    <div 
                        style={
                            {
                                borderRadius: "200%",
                                minWidth: "60px",
                                minHeight: "60px"
                            }
                        }
                        className="user-image w-full h-full bg-selectgray flex items-center justify-center rounded-full">
                        {userImage ? (
                            <h1 className="text-white select-none text-2xl">NP</h1>
                        ) : (
                            <img src={ userImage } width="100%" alt="user profile image"/>
                        )}
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
                        Upload image
                    </button>
                </div>
                <div 
                    onClick={() => handleSignOut() }
                    className="actions cursor-pointer w-20 h-24 ml-10 flex items-center">
                    <LogoutIcon/>
                </div>
            </div>

            <div className="status-container flex items-center w-full h-96">
                <div 
                style={
                    {
                        width: "80%",
                        marginLeft: "10%"
                    }
                }
                className="status mt-5 h-full">
                    <div className="content w-full cursor-default h-72">
                        <ContainedInputField handleChange={ handleChange } placeholder="Kelvin Sue" inputLabel="Fullnames"/>
                        <ContainedInputField handleChange={ handleChange } placeholder="Software Engineer..." inputLabel="Category"/>
                        
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
                                <Select options={status} handleChange={ handleChange } />
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
                                onClick={ ()=> updateUserDetails() }
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
