import { useState, useContext } from "react";
import { profileSettingsContext } from "../../appContext";
import { useDrag } from "react-use-gesture";

function ProfileSettingsComponent(props){
    const [componentPosition, setComponentPosition] = useState({
        x: 100,
        y: 100
    });

    // drag component
    const bindPosition = useDrag((params) => {
        setComponentPosition({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    // hide component context
    const toggleProfileSettings = useContext(profileSettingsContext);

    
    
    return (
        <div {...bindPosition()} className="container absolute transition shadow-lg bg-white ml-auto h-4/5 rounded w-1/3"
            style={
                {
                    top: componentPosition.y,
                    left: componentPosition.x,
                    zIndex: 1000
                }
            }
        >
            <div className="cursor-pointer mt-10 w-auto" onClick={() => toggleProfileSettings() }>close</div>
        </div>
    )
}

export default ProfileSettingsComponent;