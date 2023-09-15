import React, { useState } from "react";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../CustomHooks/UseAuth";
import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail, GoogleAuthProvider
} from "firebase/auth";
import { db, dbRef, set, signInWithPopup } from "../firebase.js";

function LoginPopUp({ showPopUp, setShowPopUp }) {
  const { getUserData } = UseAuth();
  const navigate = useNavigate();
  const [IsLoading, SetIsLoading] = useState(false)
  const [ResponseError, SetResponseError] = useState("");
  const [Details, setDetails] = useState({
    email: "",
    password: "",
  });

  function handleDetails(event) {
    const InputName = event.target.name;
    const NewValue = event.target.value;
    setDetails((prevValue) => {
      return {
        ...prevValue,
        [InputName]: NewValue,
      };
    });
  }


  const PostDetails = async (err) => {
    SetIsLoading(true)
    const { email, password } = Details;
    try {
      SetIsLoading(true);
      const signInMethods = await fetchSignInMethodsForEmail(getAuth(), email);
      if (signInMethods.length === 0) {
        SetResponseError("An account with this email does not exist.");
        setTimeout(() => {
          SetResponseError(null);
        }, 4000);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);

      if (userCredential) {
        const user = userCredential.user;
        if (user && !user.emailVerified) {
          SetResponseError("Please verify your email to login!");
          setTimeout(() => {
            SetResponseError(null);
          }, 3000);
          await getAuth().signOut();
          return;
        }

        const userData = await getUserData(user.uid);

        if (!userData) {
          SetResponseError("This Email  Is Not Associated With Any Account.");
          setTimeout(() => {
            SetResponseError(null);
          }, 3000);
          await getAuth().signOut();
          return;
        }
        const userRole = userData[user.uid]?.role;
        if (!userRole) {
          SetResponseError("This Email  Is Not Associated With Any Account..");
          setTimeout(() => {
            SetResponseError(null);
          }, 3000);
          await getAuth().signOut();
          return;
        }
        const allowedTypes = ["user"];
        if (allowedTypes.includes(userRole)) {
          const idToken = userCredential.user.getIdToken();
          console.log(idToken)
          return;
        } else {
          SetResponseError("This Email  Is Not Associated With Any Account.");
          setTimeout(() => {
            SetResponseError(null);
          }, 3000);
          await getAuth().signOut();
          return;
        }
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        SetResponseError("The provided password is incorrect.");
      } else {
        SetResponseError("There is something wrong! Please try again.");
      }
      setTimeout(() => {
        SetResponseError(null);
      }, 4000);
    }
  };
  const HandleGoogleLogin = async (err) => {

    try {
      const result = await signInWithPopup(getAuth(), new GoogleAuthProvider());
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      const { user } = result;
      const { uid, displayName, email, phoneNumber } = user;
      set(dbRef(db, `users/${uid}`), {
        uid,
        mobile: phoneNumber,
        email,
        fullname: displayName,
        role: "user",
        createdAt: new Date(),
      }).then(() => {
        setTimeout(() => {
          setShowPopUp(false);
        }, 2000);
      })

    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage)
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    PostDetails().then(() => {
      SetIsLoading(false)
    })
    setDetails({
      email: "",
      password: "",
    });
    setTimeout(() => {
      setShowPopUp(false);
    }, 2000);
  }

  return (
    <>
      {IsLoading && (
        <div id="loading-screen">
          <div className="loading-circle"></div>
        </div>
      )}
      {ResponseError && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content error-popup-model-content">
            <h3>Oh ho!</h3>
            <p className="message-text">
              {" "}
              {'\u{1F61E}'} Sorry! <br></br>
              <br></br>
              {ResponseError}
            </p>
          </div>
        </div>
      )}
      {showPopUp && (
        <div className="d-flex justify-content-center align-items-center">
        <div className="container-fluid  pop_up_login_form">
          <h3 className="u-textCenter mt-5" style={{ color: "white" }}>Sign in to Your Account</h3>
          <button className="adoption-form-close-btn" type="button" onClick={() => setShowPopUp(false)}><i className="fa fa-times"></i></button>
          <form
            name="user_login_form"
            method="POST"
            className="user_login_form"
            onSubmit={handleSubmit}
          >
            <InputField
              pattern="/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/"
              required
              type="email"
              name="email"
              placeholder="Email"
              className="signup_form_input"
              value={Details.email}
              onChange={handleDetails}
            />
            <InputField
              pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              required
              type="password"
              name="password"
              placeholder="Password"
              className="signup_form_input"
              value={Details.password}
              onChange={handleDetails}
            />

            <button className="popup_login_form_btn_class" type="submit"><i className="fa fa-lock"></i>LogIn</button>
          </form>
          <div className=" u-textCenter forgot-pwd-container mt-4">
            <Link to="/forgotpassword" className="txt txt_link m-txt_lg m-txt_underline"><p>Forgot password?</p></Link>
          </div>

          <div className="third_party_login mt-4">
            <div className="hrTitle-body"><span class=" hrTitle-body  m-txt_lg" style={{ color: "white" }}><p>or log in with</p></span></div>
          </div>
          <div className="row mt-4 justify-content-center">

            <button className="google_signup_btn_class mt-2" type="submit" onClick={HandleGoogleLogin}><span></span>Google</button>

          </div>
        </div>
        </div>
      )}

    </>
  );
}

export default LoginPopUp;
