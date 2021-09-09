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

    }, [props.date])

    return (
        <div className="relative flex items-center w-full h-12 overflow-hidden text-sm transition-all cursor-pointer select-none component-table-content-details hover:bg-coolgray">
            <div className="flex items-center w-40 h-full ml-5">
                <p className="h-5 overflow-hidden text-gray-600">{ props.name }</p>
            </div>
            <div className="flex items-center w-40 h-full">
                <p className="p-1 text-gray-600 uppercase">{ props.type } </p>
            </div>
            <div className="flex items-center w-40 h-full">
                <p className="text-gray-600 uppercase">{ props.category }</p>
            </div>
            <div className="flex items-center w-40 h-full">
                <p className="text-gray-600">{ time }</p>
            </div>
            <div className="flex items-center w-40 h-full">
                <p className="text-gray-600">{ date }</p>
            </div>
            <div className="flex items-center w-40 h-full">
                <div onClick={() => deleteDoc(props.id, props.docKey) } className="flex items-center justify-center w-3/6 h-full transition-all hover:bg-rose">
                    <DeleteIcon/>
                </div>
                <div onClick={ () => downloadDoc(props.docKey, props.name) } className="flex items-center justify-center w-3/6 h-full transition-all hover:bg-selectgreen">
                    <DownloadIcon/>
                </div>
            </div>
        </div>
    )
}

function TableHero(){
    return (
        <div className="sticky flex items-center w-full h-10 overflow-hidden text-sm uppercase border-b border-gray-800 select-none component-table-content bg-coolgray">
        <div className="flex items-center w-40 h-full ml-5">
            <p className="text-gray-600">Filename</p>
        </div>
        <div className="flex items-center w-40 h-full">
            <p className="text-gray-600">Type</p>
        </div>
        <div className="flex items-center w-40 h-full">
            <p className="text-gray-600">Category</p>
        </div>
        <div className="flex items-center w-40 h-full">
            <p className="text-gray-600">Time</p>
        </div>
        <div className="flex items-center w-40 h-full">
            <p className="text-gray-600">Date</p>
        </div>
    </div>
    )
}

function TableComponent(){
    const user = useStore(state => state.about);
    const { documents } = user;

    return (
        <div className="relative w-full mt-3 component-table h-4/6">
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