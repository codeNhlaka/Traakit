import Amplify, { Auth } from "aws-amplify";
import config from "../amplifyconfig";

// Amplify.configure({
//   Auth: {
//     region: config.globalRegion,
//     userPoolId: config.userPoolId,
//     userPoolWebClientId: config.clientId,
//   },
// });
class AuthAPI {

  static async getCurrentAuthenticatedUser(){
    let user;
    try {
      user = await Auth.currentAuthenticatedUser();
      return user;
    } catch(error){
      return error;
    }
  }

  static async signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      return user;
    } catch (error) {
      console.log(error);
      const { message } = error;
      return message;
    }
  }

  static async signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  static async signUp(username, password, email) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });

      return user;
    } catch (error) {
        return error;
    }
  }

  static async confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
      return true;
    } catch (error) {
      const { message } = error;
      return message;
    }
  }

  static async resendConfirmationCode(username) {
    try {
      await Auth.resendSignUp(username);
      return true;
    } catch (error) {
      const { message } = error;
      return message;
    }
  }

  static async forgotPassword(username) {
    try {
      const data = await Auth.forgotPassword(username);
      return data;
    } catch (error){
      const { message } = error;
      return message;
    }
  }

  static async changePassword() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, "oldPassword", "newPassword");
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  static async setNewPassword(username, code, new_password) {
    try {
      const data = await Auth.forgotPasswordSubmit(username, code, new_password);
      return data;
    } catch(error){
      const { message } = error;
      return message;
    }
  }
}

export default AuthAPI;
