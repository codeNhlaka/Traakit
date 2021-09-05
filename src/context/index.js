import { createContext, useEffect, useState } from "react";

const IndexContext = createContext(null);

function IndexProvider({ children }){
    const modals = ["profileSettings"];
    const [settings, viewSettings] = useState(false);

    /**   
     * @param { String } modal Specifies which modal should be viewed
     */

    function viewThisModal(modal){
        if (modal === "settings"){
            viewSettings(!settings);
        }
    }

    useEffect(() => {
        const w = window;

        // This will look for current viewed modal and close it
        function esc(event){
            event.preventDefault();
            let key = event.key;

            if (event.ctrlKey && event.key === 'c') {
                viewSettings(false);
            } else if(event.ctrlKey && event.key === 's') {
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