import Navigation from "../routes/nagivation.component";


const NotificationsComponent = () => (
    <div className='None:container relative overflow-hidden h-screen bg-selectgray'>
        <Navigation/>
        <div style={
        {left: '20%'}
        } className="container absolute w-4/5 h-full">
            <div className="component-title flex items-center w-full h-16 mt-10">
                <h1 className="text-white w-auto pointer-events-none select-none ml-5 text-4xl">Your notifications</h1>
            </div>
        </div>
    </div>
)

export default NotificationsComponent;