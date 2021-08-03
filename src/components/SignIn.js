import React, { useState } from "react";
import AuthAPI from "../api/auth";
import style from "./signInStyles.module.css";

// console.log(AuthAPI);

function SignIn() {
  const [signIn, setSignIn] = useState(true);

  return (
    <>
      <nav className={style.navbar}>
        <div>Logo here</div>
      </nav>
      <header>
        {signIn ? (
          <>
            <h1>SIGN IN</h1>
            <button
              onClick={() => {
                setSignIn(false);
              }}
            >
              Or create account
            </button>
          </>
        ) : (
          <>
            <h1>SIGN UP</h1>
            <button
              onClick={() => {
                setSignIn(true);
              }}
            >
              Already a member
            </button>
          </>
        )}
      </header>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="JohnDoe@hotmail.com"
            required
          />
        </div>
        {signIn && (
          <div>
            <label htmlFor="name">Username</label>
            <input id="name" type="text" placeholder="JoeDoe" required />
          </div>
        )}
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password1234"
            required
          />
        </div>

        {/* anchor for some new shit */}
        {signIn && <a href="target=_blank">Forgot Password</a>}
        <button type="submit">Continue</button>
      </form>
    </>
  );
}

export default SignIn;
