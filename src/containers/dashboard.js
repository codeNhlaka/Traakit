import { useEffect } from 'react';
import { DashboardComponent } from '../components/app.component';

function Dashboard(props){
    useEffect(() => {
        // intended for backend
        // edit this file if neccessary
    }, []);
    return <DashboardComponent confirmSignOut={props.confirmSignOut}/>
}

export default Dashboard;