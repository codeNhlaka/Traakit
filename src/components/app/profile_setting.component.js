import { useState, useContext } from "react";
import { profileSettingsContext } from "../../appContext";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";

function ProfileSettingsComponent(props){
    const [visible, setVisible] = useState(false);
    const componentPosition = useSpring({
        x: 400,
        y: 100
    });

    const bindPosition = useDrag((params) => {
        componentPosition.x.set(params.offset[0]);
        componentPosition.y.set(params.offset[1]);
    });

    const toggleProfileSettings = useContext(profileSettingsContext);
    
    return (
        <animated.div {...bindPosition()} className="container absolute transition shadow-lg bg-white ml-auto h-4/5 rounded w-1/3"
            style={
                {
                    y: componentPosition.y,
                    x: componentPosition.x,
                    zIndex: 1000
                }
            }
        >
            <div className="cursor-pointer mt-10 w-auto" onClick={() => toggleProfileSettings() }>close</div>
        </animated.div>
    )
}

export default ProfileSettingsComponent;