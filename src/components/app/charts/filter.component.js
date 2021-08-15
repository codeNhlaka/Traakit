import { useState } from "react";
import { useDrag } from "react-use-gesture";
import DragIcon from "../../../assets/icons/drag.icon"

function FilterComponent(){
    const [componentPosotion, setComponentPosition] = useState({
        y: 100,
        x: 100
    });

    function hideFilt(){
        // hide this component
    }

    const bindPosition = useDrag((params) => {
        setComponentPosition({
            x: params.offset[0],
            y: params.offset[1]
        })
    });

    const style = {
        left: componentPosotion.x,
        top: componentPosotion.y
    }
    
    return (
        <div {...bindPosition()} style={style} className="container flex items-center absolute z-50 w-80 rounded shadow-md h-20 bg-coolgray">
            <div onClick={() => hideFilt() } className="drag-indicator cursor-move flex justify-center items-center w-10 h-full">
                <DragIcon/>
            </div>
        </div>
    )
}

export default FilterComponent;