import { useState } from 'react';
import ConfirmAccount from './confirmAccount.component';
import { useFormik } from 'formik';

            // <div>
            //     <h1>SignUp Component</h1>
            //     <button onClick={() => props.toggle("signIn")}>Already a member</button>
            //     <button onClick={() => setUser(true)}>Sign Up</button>
            // </div>
    

function FormikSignUp(props){
    async function handleSignIn(username, password, email, confirmPassword){
        let user;
        if (username && password && email && confirmPassword){
            return props.confirmAuthentication();
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          },
        onSubmit: values => {
            const {username, email, password, confirmPassword} = values;
            return handleSignIn(username, password, email, confirmPassword);
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}> 
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" value={formik.values.username} name="username" onChange={formik.handleChange} placeholder="JohnDoe" maxLength="12"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" value={formik.values.email} name="email" onChange={formik.handleChange} placeholder="Email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={formik.values.password} name="password" onChange={formik.handleChange} placeholder="Password123@" maxLength="14"/>
            </div>
            <div>
                <label htmlFor="confirm password">Confirm Password</label>
                <input type="password" value={formik.values.password} name="confirm password" onChange={formik.handleChange} placeholder="Password132@" maxLength="14"/>
            </div>
            <button type="submit">Continue</button>
        </form>
    )
}

function SignUp(props){
    const [user, setUser] = useState(false);
    if (user){
       return <ConfirmAccount/>
    } else {
        return (
            <>
            <div className="greet-section"></div>
            <div className="form-section">
                <div>
                    <h1>Continue with</h1>
                    <h3>Sign Up</h3>
                    <button onClick={e => {
                        e.preventDefault();
                        props.toggle("signUp")
                    }}>Already a member</button>

                    <FormikSignUp confirmAuthentication={props.confirmAuthentication}/>
                </div>
            </div>
            </>
        )
    }
}

export default SignUp;

