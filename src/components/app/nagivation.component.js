const UserDetails = () => (
    <div>hello there, user details</div>
);

const DashboardOptions = () => (
    <div>hi there dashboard options here</div>
)

const SignOutSection = () => (
    <div>hi we signout here</div>
)

function Navigation(){
    return (
        <div>
            <UserDetails/>
            <DashboardOptions/>
            <SignOutSection/>
        </div>
    )
}

export default Navigation;