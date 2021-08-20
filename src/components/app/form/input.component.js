import { useState } from "react";

export function ContainedInputField(){
    return (
            <div 
                style={ {
                    position: 'relative',
                    left: '10%',
                    height: '80px'
                }}
                className="company-name w-4/5 mt-2 flex"
            >
                <div className="w-full ">
                    <p className="text-gray-400 text-sm">Company Name</p>
                    <InputField placeholder="Company"/>
                </div>
            </div>
    )
}

export default function InputField(props){
    const [inputValue, setInputValue] = useState(null);
    const { placeholder } = props;
    const { value } = props;

    function changeInputValue(e){
        return setInputValue(e.target.value);
    }

    return <input 
                value={ value ? value : null}
                placeholder={ placeholder } 
                className={`bg-transparent bg-selectgray w-full h-10 mt-2 text-sm rounded-md border-none outline-none px-5 text-gray-700`} 
                onChange={e => changeInputValue(e) }
            />
}

