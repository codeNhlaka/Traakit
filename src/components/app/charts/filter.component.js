import { useState } from "react";
import { useDrag } from "react-use-gesture";
import DragIcon from "../../../assets/icons/drag.icon"

function FilterComponent(){
    const [componentPosotion, setComponentPosition] = useState({
        y: 340,
        x: 450
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
        <div {...bindPosition()} style={style} className="border border-gray-800 container flex items-center absolute z-50 w-80 rounded shadow-md h-20 bg-coolgray">
            <div onClick={() => hideFilt() } className="drag-indicator cursor-move flex justify-center items-center w-10 h-full">
                <DragIcon/>
            </div>
            <div className="option cursor-pointer w-16 h-full container text-white flex justify-center items-center">
                <h1 style={{color: "#30e3f0"}} className="select-none">1D</h1>
            </div>
            <div className="option cursor-pointer  w-16 h-full container text-white flex justify-center items-center">
                <h1 className="select-none">1M</h1>
            </div>
            <div className="option cursor-pointer w-16 h-full container text-white flex justify-center items-center">
                <h1 className="select-none">1Y</h1>
            </div>
        </div>
    )
}

export default FilterComponent;