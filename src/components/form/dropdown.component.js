import { useState, useEffect } from "react";
import Expand from "../../assets/icons/expand.icon";

const defaultStyle = {
    width: '98%', 
    'marginLeft': '1%'
}

const activeStyle = {
    width: '98%', 
    marginLeft: '1%',
    backgroundColor: '#15171A',
    border: '1px solid #1F2937',
}

const customStyle = {
    width: "0.5px",
    backgroundColor: "#9CA3AF"
};


function Options(props){
    const [options, setOptions] = useState([]);
    let currentValue = props.value;

    function changeCurrentValue(newValue){
        props.changeValue(newValue);
    }

    useEffect(() => {
        const providedOptions = props.options;

        if (providedOptions){
            setOptions(providedOptions);
        } else {
            setOptions(['Pending', 'Rejected', 'Interview', 'Offer']);
        }
    }, [props.options])

    return (
        <div 
            style={ {width: '50%', marginLeft: '5%'} } 
            className="h-auto mt-2 overflow-hidden border border-gray-800 rounded-md menu bg-selectgray"
        >
            <ul>
                {options.map(option => {
                    return (
                        <li 
                            key={ option } 
                            className={`w-full h-10 text-sm hover:bg-coolgray ${ option === currentValue ? 'bg-coolgray' : null} px-5 text-gray-400 cursor-pointer text-sm flex items-center`}
                            onClick={() => changeCurrentValue(option) } 
                        >
                            {option}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function Select(props){
    const [menuActive, setMenuActive] = useState(false);
    const [value, setValue] = useState("");
    let forInput;
    const currentVal = props.value;

    function changeValue(value){
        if (value){
            setValue(value);
            props.category ? forInput = props.category : forInput = "status";

            props.handleChange(forInput, value);
            return setMenuActive(!menuActive);
        }

        return;
    }

    return (
        <div 
            className="w-full h-auto mt-2 transition-all control">
            <div 
                style={ menuActive ? activeStyle : defaultStyle} 
                className="flex items-center w-11/12 h-10 rounded-md input-area bg-selectgray"
                >
                <div 
                    onClick={() => setMenuActive(!menuActive)} 
                    className="h-full input"
                >
                    <input 
                        disabled 
                        value={ value }
                        className="w-4/5 h-full px-5 text-sm text-gray-700 bg-transparent border-none rounded-none outline-none cursor-pointer" 
                        placeholder={currentVal || "Select"}
                    />
                </div>
                
                <div className="flex items-center justify-center w-2 h-full ml-2 seperator">
                    <div 
                        style={ customStyle } 
                        className="h-3/6">
                    </div>
                </div>
                
                <div 
                    onClick={() => setMenuActive(!menuActive)} 
                    className="flex items-center justify-center w-10 h-full ml-2 cursor-pointer indicator"
                >
                    <Expand />
                </div>
            </div>
            { menuActive ? <Options options={props.options} value={ value } changeValue={ changeValue }/> : null }
        </div>
    )
}   

export default Select;