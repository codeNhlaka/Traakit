import { useEffect, useState, useContext } from "react";
import { useStore } from "../../../store/store";
import { DocumentsContext } from "../../../context/documents";
import DownloadIcon from "../../../assets/icons/download.icon";
import DeleteIcon from "../../../assets/icons/delete.icon";

function TableList(props){
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const { downloadDoc } = useContext(DocumentsContext);
    const { deleteDoc } = useContext(DocumentsContext);

    useEffect(() => {        
        function formatDate(date){
            const createAt = date.split("T");
            const fdate = createAt[0];
            const ftime = createAt[1].split(".")[0];

            return { fdate, ftime };
        }

        // format date 
        const createdAt = formatDate(props.date);

        // update state

        setDate(createdAt.fdate);
        setTime(createdAt.ftime);

    }, [])

    return (
        <div className="component-table-content-details cursor-pointer text-sm relative select-none flex items-center overflow-hidden transition-all hover:bg-coolgray w-full h-12">
            <div className="w-40 ml-5 flex items-center h-full">
                <p className="text-gray-600 h-5 overflow-hidden">{ props.name }</p>
            </div>
            <div className="w-40 flex items-center h-full">
                <p className="p-1 text-gray-600 uppercase">{ props.type } </p>
            </div>
            <div className="w-40 flex items-center h-full">
                <p className="text-gray-600 uppercase">{ props.category }</p>
            </div>
            <div className="w-40 flex items-center h-full">
                <p className="text-gray-600">{ time }</p>
            </div>
            <div className="w-40 flex items-center h-full">
                <p className="text-gray-600">{ date }</p>
            </div>
            <div className="w-40 flex items-center h-full">
                <div onClick={() => deleteDoc(props.id, props.docKey) } className="w-3/6 h-full hover:bg-rose flex items-center justify-center transition-all">
                    <DeleteIcon/>
                </div>
                <div onClick={ () => downloadDoc(props.docKey, props.name) } className="w-3/6 h-full hover:bg-selectgreen flex items-center justify-center transition-all">
                    <DownloadIcon/>
                </div>
            </div>
        </div>
    )
}

function TableHero(){
    return (
        <div className="component-table-content uppercase text-sm sticky border-b border-gray-800 select-none flex items-center overflow-hidden bg-coolgray w-full h-10">
        <div className="w-40 ml-5 flex items-center h-full">
            <p className="text-gray-600">Filename</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Type</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Category</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Time</p>
        </div>
        <div className="w-40 flex items-center h-full">
            <p className="text-gray-600">Date</p>
        </div>
    </div>
    )
}

function TableComponent(){
    const user = useStore(state => state.about);
    const { documents } = user;

    useEffect(() => {
    }, []);

    return (
        <div className="component-table relative w-full h-4/6 mt-3">
            <TableHero/>
            { documents.length ? documents.map(document => {
                return (
                    <TableList 
                        docKey={ document.key } 
                        name={ document.name }
                        type={ document.type }
                        category={ document.category }
                        id={ document.id}
                        date={ document.createdAt }
                    />
                )
            }): null }
        </div>
    )
}

export default TableComponent;