import { createContext, useEffect, useState } from "react";

const IndexContext = createContext(null);

function IndexProvider({ children }){

    const [settings, viewSettings] = useState(false);

    function viewThisModal(modal){
        if (modal === "settings"){
            viewSettings(!settings);
        }
    }

    useEffect(() => {
        const w = window;

        // This will look for current viewed modal and close it
        function esc(event){
            if (event.ctrlKey && event.key === 'c') {
                viewSettings(false);
            } else if(event.ctrlKey && event.key === 'x') {
                viewSettings(true);
            }
        }

        w.addEventListener('keydown', esc);


    }, []);

    return (
        <IndexContext.Provider value={{ settings, viewThisModal }}>
            { children }
        </IndexContext.Provider>
    )
}
export { IndexProvider, IndexContext }