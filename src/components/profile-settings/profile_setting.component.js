import { useState, useContext, useEffect, createRef } from "react";
import Select from "../form/dropdown.component";
import { ContainedInputField } from "../form/input.component";
import AccountIcon from "../../assets/icons/account.icon";
import { useStore } from "../../store/store";
import { SettingsContext, ProfileSettingsProvider } from "../../context/profile-settings";
import { updateUserImage } from '../../graphql/mutations';
import { IndexContext } from "../../context/index";

const componentP = {
    x: 100,
    y: 100
};

function Profile(){
    const { handleImageUpload, updateInformation } = useContext(SettingsContext);
    const { viewThisModal } = useContext(IndexContext);
    let fileInputRef = createRef(null);
    const user = useStore(state => state.about);

    const [ alteredDetails, alterDetails ] = useState({
        fullnames: null,
        skill: null,
        status: null
    });

    const [componentPosition] = useState(componentP);

    function handleFileUpload(){
        fileInputRef.click();
    }

    function handleChange(forInput, value){
        const property = forInput;
        alterDetails({
            ...alteredDetails,
            [property] : value
        });
    }

    return (
            <div className="container absolute w-1/3 ml-auto transition border border-gray-800 rounded shadow-lg bg-coolgray h-4/5"
                style={
                    {
                        top: componentPosition.y,
                        left: componentPosition.x,
                        zIndex: 1000
                    }
                }
            >
                <div className="flex items-center justify-end w-full h-10 select-none w-16mt-2">
                    <p onClick={() => viewThisModal("settings") } className="w-16 text-white cursor-pointer select-none">close</p>
                </div>
                
                <div className="flex items-center w-full h-24 user-image-details">
                    <div 
                        style={
                            {
                                minWidth: "95px",
                                minHeight: "95px"
                            }
                        }
                        className="relative flex items-center justify-center ml-5 overflow-hidden user-image-container">
                            <div 
                                style={
                                    {
                                        width: '90px',
                                        height: '90px',
                                        borderRadius: '2000px',
                                    }
                                }
                                className="container overflow-hidden">
                                { user.imageKey.key ? (
                                    <img src={ user.imageKey.url } style={{
                                        width: "90px",
                                        height: "90px",
                                        objectFit: "cover"
                                    }}/>
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
                                        className="flex items-center justify-center bg-selectgray">
                                            <AccountIcon />
                                    </div>
                                )
                                }
                            </div>
                    </div>
                    <div className="flex items-center w-56 h-24 ml-2 actions">
                        
                        <input 
                            ref={e => fileInputRef = e} 
                            type="file" 
                            hidden
                            onChange={ e => handleImageUpload(e) }
                        />

                        <button 
                            style={
                                    {
                                        width: '80%',
                                        marginLeft: '5%'
                                    }
                                    } 
                            onClick={ e => handleFileUpload(e)}
                            className="h-10 text-white transition-all rounded-md cursor-pointer bg-selectgreen hover:bg-selectgreenhover"
                        >
                            Change Image
                        </button>
                    </div>
                </div>

                <div className="flex items-center w-full status-container h-80">
                    <div 
                    style={
                        {
                            width: "95%",
                            marginLeft: "2.5%"
                        }
                    }
                    className="h-full mt-5 status ">
                        <div className="w-full cursor-default h-72">
                            <ContainedInputField handleChange={ handleChange } placeholder={ user.data.fullnames || "Oleg Fakeev"} inputLabel="Fullnames"/>
                            <ContainedInputField handleChange={ handleChange } placeholder={ user.data.skill || "Graphic Designer"} inputLabel="Skill"/>
                            
                            <div 
                                style={ {
                                position: 'relative',
                                left: '10%',
                                height: '80px'
                                }}
                                className="flex w-4/5 mt-2 company-name"
                            >
                                <div className="w-full ">
                                    <p className="text-sm text-gray-400">Employement Status</p>
                                    <Select options={['Unemployed', 'Employed']} value={ user.data.employmentStatus || null } handleChange={ handleChange } />
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
                                    onClick={() => updateInformation(alterDetails)}
                                    className="h-10 text-white transition-all rounded-md cursor-pointer bg-selectgreen hover:bg-selectgreenhover"
                            >
                                Update Information
                            </button>
                        </div>
                    </div>
                </div>  
            </div>
    )
}

export default function ProfileSettings(){
    return (
        <ProfileSettingsProvider>
            <Profile/>
        </ProfileSettingsProvider>
    )
}
