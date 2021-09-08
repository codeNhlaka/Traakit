import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Spinner = () => (
    <div className="flex items-center justify-center w-screen h-screen bg-selectgray">
        <div className="flex items-center justify-center w-10 h-10">
            <Loader
                type="Oval"
                color="white"
                
            />
        </div>
    </div>
);

export default Spinner;