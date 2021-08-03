import React, { useState } from "react";
import AuthAPI from "../api/auth";
import style from "./signInStyles.module.css";

function SignIn() {
  const [signIn, setSignIn] = useState(true);
  const [user, setUser] = useState();
  const [form, setForm] = useState({
    username: null,
    password: null,
    email: null,
  });
  //   only works on sign up for now
  const signUp = async () => {
    const { username, password, email } = form;
    let response = await AuthAPI.signUp(username, password, email); // async function
    
    if (typeof response === "string") {
      console.log(response);
    } else {
      setUser(response.username);
      console.log(user);
      // switch to confirm screen
    }
  };
  return (
    <>
      <nav className={style.navbar}>
        <div>Logo here</div>
      </nav>
      <pre>{JSON.stringify(form, null, 2)}</pre>
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
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
        </div>
        {!signIn && (
          <div>
            <label htmlFor="name">Username</label>
            <input
              id="name"
              type="text"
              placeholder="JoeDoe"
              required
              onChange={(e) => {
                setForm((prev) => {
                  return { ...prev, username: e.target.value };
                });
              }}
            />
          </div>
        )}
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password1234"
            required
            onChange={(e) => {
              setForm((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />
        </div>

        {/* anchor for some new shit */}
        {signIn && <a href="target=_blank">Forgot Password</a>}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signUp();
          }}
        >
          Continue
        </button>
      </form>
    </>
  );
}

export default SignIn;
