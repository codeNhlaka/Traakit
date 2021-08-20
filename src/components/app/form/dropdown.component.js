import { useState } from "react";
import Expand from "../../../assets/icons/expand.icon";

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
    const [options, setOptions] = useState(['Pending', 'Rejected', 'Interview', 'Offer']);
    let currentValue = props.value;

    function changeCurrentValue(newValue){
        props.changeValue(newValue);
    }

    return (
        <div 
            style={ {width: '50%', marginLeft: '5%'} } 
            className="menu mt-2 bg-selectgray rounded-md overflow-hidden border border-gray-800  h-40"
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

function Select(){
    const [menuActive, setMenuActive] = useState(false);
    const [value, setValue] = useState("Pending");

    function changeValue(value){
        if (value){
            setValue(value);
            return setMenuActive(!menuActive);
        }

        return;
    }

    return (
        <div 
            className="control w-full h-auto mt-2 transition-all">
            <div 
                style={ menuActive ? activeStyle : defaultStyle} 
                className="input-area rounded-md bg-selectgray flex items-center w-11/12 h-10"
                >
                <div 
                    onClick={() => setMenuActive(!menuActive)} 
                    className="input h-full"
                >
                    <input 
                        disabled 
                        value={ value }
                        className="px-5 text-sm text-gray-700 cursor-pointer bg-transparent border-none outline-none rounded-none h-full w-4/5" 
                        placeholder="Select"
                    />
                </div>
                
                <div className="seperator ml-2 w-2 h-full flex justify-center items-center">
                    <div 
                        style={ customStyle } 
                        className="h-3/6">
                    </div>
                </div>
                
                <div 
                    onClick={() => setMenuActive(!menuActive)} 
                    className="indicator ml-2 cursor-pointer w-10 h-full flex justify-center items-center"
                >
                    <Expand />
                </div>
            </div>
            { menuActive ? <Options value={ value } changeValue={ changeValue }/> : null }
        </div>
    )
}   

export default Select;