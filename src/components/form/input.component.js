import { useState } from "react";

export function ContainedInputField(props){
    return (
            <div 
                style={ {
                    position: 'relative',
                    left: '10%',
                    height: '80px'
                }}
                className="flex w-4/5 mt-2 company-name"
            >
                <div className="w-full ">
                    <p className="text-sm text-gray-400">{props.inputLabel}</p>
                    <InputField 
                        handleChange={ props.handleChange } 
                        label={props.inputLabel} 
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        />
                </div>
            </div>
    )
}

export default function InputField(props){
    const [inputValue, setInputValue] = useState(null);
    const { placeholder } = props;
    const { value, label } = props;


    function changeInputValue(e){
        return setInputValue(e.target.value);
    }

    function handleOnBlur(){
        if (inputValue){
            const modifiedLable = label.toLowerCase();
            props.handleChange(modifiedLable, inputValue);
        }
    }

    return <input 
                value={ value ? value : null}
                placeholder={ placeholder } 
                className={`bg-transparent bg-selectgray w-full h-10 mt-2 text-sm rounded-md border-none outline-none px-5 text-gray-700`} 
                onChange={e => changeInputValue(e) }
                onBlur={() => handleOnBlur() }
                disabled={props.disabled}
            />
}

